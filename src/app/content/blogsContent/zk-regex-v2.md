# zk-Regex v2: Revolutionizing Verifiable and Private Regex Proofs

## 1. Introduction: The Next Leap for zk-Regex

The ability to privately verify textual patterns is a cornerstone of secure digital interaction. zk-Regex emerged as a groundbreaking solution, enabling zero-knowledge proofs of regular expression matches. **This grants the ability to prove that specific patterns exist within private text without revealing the text itself, opening up new avenues for trust and verification.**

zk-Regex v1, for instance, was the first practical library of its kind to be used in production, successfully powering critical applications. These included:

-   [Bolstering sybil resistance mechanisms](// TODO: Add link)
-   [Enabling zk-p2p email proofs for financial transactions ](// TODO: Add link)
-   [Facilitating secure email-based recovery for Ethereum accounts](// TODO: Add link)

The core strength of v1 lay in allowing users to selectively disclose specific strings and prove complex regex patterns within both email headers and bodies, all without revealing unrelated sensitive information.

However, v1's architecture, while pioneering, encountered significant hurdles with more expressive regex patterns. Challenges such as efficiently handling dynamic branching, managing multiple potential accept states, supporting nuanced features like lazy versus greedy matching, and the overall in-circuit complexity for specific regex constructs often resulted in unwieldy and less performant circuits. These challenges demanded a fresh perspective.

This article introduces zk-Regex v2, a complete redesign born from extensive R&D, which establishes a new paradigm in ZK-based text proving by offering unprecedented flexibility, significantly broader regex feature support, and substantial efficiency gains. We'll explore the core technical innovations that give v2 these capabilities, marking a new era for ZK pattern matching.

## 2. From DFAs in Circuits to NFAs with Pre-computation: The Big Shift

### The v1 Approach (A Quick Look Back)

The initial version of zk-Regex, while groundbreaking for its time, employed a direct and highly intricate method to translate regular expressions into verifiable ZK circuits. The core of this approach revolved around Deterministic Finite Automata (DFAs) and their direct embedding into arithmetic circuits, primarily using Circom.

#### 1. Regex Decomposition and DFA Construction:

The journey from regex to circuit in v1 began with a "decomposed regex" strategy. Developers would define a pattern as a sequence of smaller regex "parts," each tagged with an `is_public` flag to indicate whether its matched content should be revealable. A typical definition looked like this:

```json
{
    "parts": [
        {
            "is_public": false,
            "regex_def": "(\r\n|^)dkim-signature:"
        },
        {
            "is_public": false,
            "regex_def": "([a-z]+=[^;]+; )+bh="
        },
        {
            "is_public": true,
            "regex_def": "[a-zA-Z0-9+/=]+"
        },
        {
            "is_public": false,
            "regex_def": ";"
        }
    ]
}
```

Each `regex_def` was individually converted into a mini-DFA using Rust's [`regex_automata`](https://github.com/rust-lang/regex/tree/1a069b9232c607b34c4937122361aa075ef573fa/regex-automata) library. These separate DFAs were then "stitched" together by connecting the accepting states of one part-DFA to the start state of the subsequent part-DFA, forming a single, larger, graph-like DFA structure that represented the entire decomposed pattern. The `is_public` flag was associated with the segment of the combined DFA corresponding to that part, marking its states for potential selective disclosure.

#### 2. Direct DFA-to-Circuit Translation:

The constructed DFA was then translated into a Circom circuit. This process was complex and resulted in circuits that directly mirrored the DFA's state transition logic arithmetically. For each input character, the circuit would:

-   Determine the current active DFA state(s).
-   Evaluate the input character against all possible transitions from those active states.
-   Activate the next DFA state(s) based on matching transitions.

This was typically achieved using arrays of signals representing DFA states (e.g., `states[byte_index][state_id]`) and a large number of arithmetic/boolean components (`IsEqual`, `AND`, `MultiOR`) to encode the transition table. "Selector" arrays and conditional logic would gate the activation of subsequent states.

An excerpt from a v1-generated Circom circuit for a regex like `(\r\n|^)dkim-signature:([a-z]+=[^;]+; )+bh=[a-zA-Z0-9+/=]+;` illustrates this. Note the `states` array, the loop processing `msg[i]`, and the explicit transition logic:

```circom
// ...
template BodyHashRegex(msg_bytes) {
    signal input msg[msg_bytes];
    signal output out;
    // ...
    signal states[num_bytes+1][35]; // Represents 35 DFA states over num_bytes
    // ...
    for (var i = 0; i < num_bytes; i++) {
        // ... (input character validation) ...
        // Example of transition logic from state 0 for character 13 ('\r')
        eq[0][i] = IsEqual();
        eq[0][i].in[0] <== in[i];
        eq[0][i].in[1] <== 13; // Check if current char is '\r'
        and[0][i] = AND();
        and[0][i].a <== states[i][0]; // Is current state 0 active?
        and[0][i].b <== eq[0][i].out; // Is current char '\r'?
        // states_tmp[i+1][1] would be set based on and[0][i].out
        // ... many similar lines for all transitions from all states ...
        states[i+1][1] <== MultiOR(2)([states_tmp[i+1][1], from_zero_enabled[i] * and[0][i].out]); // Activate next state
    }
    // ...
    // Check if any accept state is reached
    component is_accepted = MultiOR(num_bytes+1);
    for (var i = 0; i <= num_bytes; i++) {
        is_accepted.in[i] <== states[i][34]; // State 34 is an accept state
    }
    out <== is_accepted.out;
    // ...
}
```

The sheer number of pre-instantiated components (e.g., `component eq[90]`, `component and[76]`) in a full circuit gives an idea of the resulting scale and constraint count.

#### 3. Selective Disclosure (Capture Groups) in v1:

The "decomposed regex" design was central to v1's capture group mechanism. Since the overall DFA was a chain of part-DFAs, the start and end states of each part within the larger DFA graph were known. If a part was marked `is_public: true`, the circuit would track when the DFA traversal entered and exited the states corresponding to that part. Input bytes processed while "inside" these `is_public` DFA segments were conditionally outputted.
This is hinted at in the Circom example with `reveal0` signals:

```circom
// ...
// substrings calculated: [{(32, 33), (33, 33)}]
signal prev_states0[2][msg_bytes];
signal is_substr0[msg_bytes];
signal is_reveal0[msg_bytes];
signal output reveal0[msg_bytes];
for (var i = 0; i < msg_bytes; i++) {
    // Logic to determine if current char is part of the 0-th public substring
    prev_states0[0][i] <== (1 - from_zero_enabled[i+1]) * states[i+1][32]; // Example: state 32 is start of a public part
    prev_states0[1][i] <== (1 - from_zero_enabled[i+1]) * states[i+1][33]; // Example: state 33 is within/end of a public part
    is_substr0[i] <== MultiOR(2)([prev_states0[0][i] * states[i+2][33], prev_states0[1][i] * states[i+2][33]]);
    is_reveal0[i] <== MultiAND(3)([out, is_substr0[i], is_consecutive[i][2]]);
    reveal0[i] <== in[i+1] * is_reveal0[i]; // Output byte if conditions met
}
// ...
```

#### 4. Core Challenges Faced by v1:

This direct DFA-in-circuit approach, while functional for certain regexes, hit fundamental walls:

-   **Circuit Complexity and Size**: DFAs, especially for non-trivial regexes, can be massive. Directly encoding every state and transition into arithmetic constraints led to extremely large and complex circuits, translating to high proving times and setup costs. The example circuit's state array `states[num_bytes+1][35]` for a relatively simple part of a email regex hints at this.

-   **Inflexibility with Advanced Regex Features**: The static, "constant computational graph" nature of ZK circuits struggled with regex features that imply dynamic behavior or require backtracking/lookarounds. Features like sophisticated conditional branching, lookaheads/lookbehinds, and non-greedy matching were difficult or impossible to support efficiently, as they often lead to DFAs with an explosive number of states or require logic beyond simple state transitions.

-   **Limitations of DFA Composition for Captures**: The strategy of joining part-DFAs to handle captures was a clever workaround. However, it was a somewhat naive composition; the resulting combined DFA might not always be equivalent to a DFA generated holistically from the complete regex. This could lead to subtle semantic differences or inefficiencies and limited the complexity of capture group logic that could be reliably implemented.

-   **State Explosion**: Many common regex constructs (e.g., `.\*`, or patterns with wide character ranges and unbounded repetitions) can cause an explosion in the number of DFA states. This directly exacerbated the circuit size and complexity issues. DFA minimization techniques employed were often insufficient to counter this for complex patterns.

These limitations were the primary drivers for rethinking the entire approach, leading to the development of zk-Regex v2.

### The v2 Vision: Flexibility and Off-Circuit Intelligence

The limitations encountered in zk-Regex v1 prompted a fundamental redesign, leading to a new paradigm centered on Non-deterministic Finite Automata (NFAs) and a strategic separation of concerns: complex computation outside the ZK circuit, and efficient verification within it.

#### 1. Embracing Non-deterministic Finite Automata (NFAs):

The choice to pivot from DFAs to NFAs as the foundational automata representation in v2 was driven by several key advantages:

-   **Compactness and Efficiency**: NFAs are often significantly more compact than their DFA equivalents, especially for regexes involving alternations (e.g., `a|b`), Kleene stars (e.g., `a*`), or optional quantifiers (e.g., `a?`). This is because an NFA can "guess" which path to take, representing multiple possibilities with fewer states. While a DFA must explicitly define a state for every possible combination of active NFA states (due to subset construction), an NFA can navigate to a match through a potentially much shorter sequence of states, even if it explores multiple paths non-deterministically.
-   **Robust, Optimized NFA Construction**: zk-Regex v2 leverages Rust's mature [`regex_automata`](https://github.com/rust-lang/regex/tree/1a069b9232c607b34c4937122361aa075ef573fa/regex-automata) library, which employs a modified Thompson's NFA construction algorithm. This provides industry-tested, highly optimized, and robust NFA representations directly from regex patterns.
-   **Native Capture Group Support**: A crucial advancement offered by the [`regex_automata`](https://github.com/rust-lang/regex/tree/1a069b9232c607b34c4937122361aa075ef573fa/regex-automata) NFA representation is its inherent support for capture groups. The NFA structure itself includes special epsilon transitions (transitions that don't consume input characters) to explicitly mark the entry and exit points of capture groups. This was a significant improvement over v1's DFA "stitching" approach, allowing v2 to use a single, cohesively optimized NFA for the entire regex pattern, with capture group semantics naturally embedded. This eliminated the need for the "decomposed regex" parts and the potential semantic issues of manual DFA joining.

#### 2. The Core Idea: Off-Circuit Computation, In-Circuit Verification:

The most significant philosophical shift in v2 is the decoupling of the regex matching operation from the ZK verification operation.

-   **Off-Circuit Path Finding**: Once an NFA graph (with embedded capture group information) is constructed for the given regex pattern, the process of finding a match in a specific input string (the "haystack") occurs entirely outside the ZK circuit. This "matching operation" involves traversing the NFA with the haystack to determine if an accept state can be reached. If a match is found, this process yields a "traversal path." This path is essentially a sequence of tuples: `(current_state, input_byte_consumed, next_state, Option<capture_group_info>)`. Since NFAs are non-deterministic, multiple such paths might theoretically lead to an accept state; the off-circuit process finds one such valid path.

-   **In-Circuit Verification**: The ZK circuit's role is dramatically simplified. Instead of simulating the NFA/DFA logic itself, it takes the pre-computed traversal path (and the haystack segment) as private inputs and performs efficient verification. The circuit's primary responsibilities are to check:
    1.  Valid Start: Does the provided traversal path begin with a legitimate NFA start state?
    2.  Valid Transitions: For each step in the path `(curr_state_i, byte_i, next_state_i, capture_info_i)`:
        -   Is the transition from `curr_state_i` to `next_state_i` upon consuming `byte_i` a valid transition according to the NFA's structure (which is hardcoded or represented as a lookup table within the circuit)?
        -   Is the `capture_info_i` consistent with the NFA's definition for this transition?
    3.  Path Continuity (Linked List Fashion): Is `next_state_i` from one step correctly used as `curr_state_{i+1}` in the subsequent step?
    4.  Valid End: Does the traversal path terminate in a recognized NFA accept state after consuming all characters in the matched segment?

This verification is performed against a hardcoded representation of the valid NFA transitions (often a "transition lookup table") and the known start/accept states. Spoofing this verification is computationally infeasible; any tampering with the input haystack or the claimed path (e.g., adding extra bytes, skipping states, or faking transitions) would cause the circuit's checks to fail.

#### 3. Anticipated Gains and Flexibility:

This new vision promised—and delivered—several critical advantages:

-   **Drastically Reduced Circuit Complexity**: By offloading the complex NFA simulation (which can involve exploring multiple paths, backtracking in a conceptual sense) to the off-circuit domain, the ZK circuits become significantly smaller and simpler. They no longer need to encode the entire state machine's dynamic execution but merely check a linear sequence of transitions against a fixed table. This translates to fewer constraints, faster proving times, and lower setup costs.
-   **Support for Full Regex Power**: Because the actual regex matching logic (including handling of complex features like conditional branching, backtracking, lookaheads, and lookbehinds) is executed off-circuit, v2 can support a much wider, more expressive range of regex patterns than v1. The circuit only needs to verify the resultant path of this powerful off-circuit matching.
-   **Targeted Matching**: While possible in v1, v2 more naturally accommodates matching against only a relevant sub-segment of a larger haystack. The off-circuit process can identify this segment, and only this part and its corresponding traversal path need to be provided to the circuit. For instance, instead of processing an entire email body, one can extract a relevant paragraph and prove a pattern within it.
-   **Simplified Auditing and Modularity**: The circuit logic in v2 is more straightforward – primarily table lookups and sequence checks. This simplifies the auditing process. Furthermore, the NFA processing and path generation are proving-system agnostic until the final step of generating circuit-specific inputs and verifier code (e.g., for Circom or Noir, as seen in `compiler/src/nfa/codegen/circom.rs` and `compiler/src/nfa/codegen/noir.rs`). This modularity offers greater flexibility.

This strategic shift to off-circuit NFA traversal and lean in-circuit verification forms the bedrock of zk-Regex v2's enhanced capabilities and efficiency.

## 3. Novel Technique #1: Crafting Epsilon-Free NFAs for Arithmetic Proving Systems

### From Regex to Optimized NFA

-   Leveraging robust libraries (e.g., Rust's `regex_automata`) for initial NFA construction.
-   Why NFAs? Natural fit for regex, handling ambiguity and complex patterns more directly.

### The Epsilon Challenge

-   Why epsilon transitions are problematic for direct translation to arithmetic circuits.

### Our Solution: The Epsilon Elimination Algorithm

-   High-level explanation of your custom algorithm: Systematically replacing epsilon transitions with concrete byte transitions.
-   Crucially, how capture group semantics are meticulously preserved and integrated during this transformation.
-   The output: A "clean" NFA (no epsilons) that describes all valid paths and capture boundaries purely in terms of byte sequences. This NFA is proving-system agnostic at this stage.

## 4. Novel Technique #2: Efficiently Mapping NFAs to Circom & Noir Circuits

### Flattening the NFA: Creating the "Transition Lookup Table"

-   Detail how the states, byte-based transitions, and capture group markers from the epsilon-free NFA are encoded into a structured, hardcoded lookup table within the circuit.

### Off-Circuit Work: Finding the Needle in the Haystack

-   When proving a specific haystack: The traversal path (sequence of states activated by input bytes) is determined _outside_ the ZK circuit using the NFA logic.
-   This path inherently includes information about which capture groups were entered and exited.

### In-Circuit Verification: Lean and Mean

-   The circuit receives: the input string (haystack), the pre-computed traversal path.
-   Circuit's responsibility:
    1.  Verify each step in the provided path against the hardcoded NFA transition lookup table.
    2.  Confirm the path starts at a valid initial NFA state and concludes in an NFA accept state.
    3.  Output revealed substrings: Since capture group boundaries are part of the path/lookup table, extraction becomes a direct consequence of a valid path.
-   Highlight the dramatic reduction in circuit complexity compared to v1.

## 5. What zk-Regex v2 Delivers

-   **Expanded Regex Universe:** Discuss the broader range of regex patterns now provable (addressing v1's gaps).
-   **Performance and Scalability Gains:** Explain how the new architecture leads to faster proofs and better handling of complex regexes or larger inputs.
-   **Proving System Agnostic Core:** Reiterate that the NFA processing is portable, with the final step being circuit-specific (Circom, Noir).
-   **Simplified and Accurate Capture Groups:** How the new method makes substring extraction more robust.

## 6. The Broader Impact: zk-Regex as a Public Good

-   Beyond emails: Enabling verifiable regex operations on _any_ text data.
-   Potential use cases: On-chain data validation, private information extraction from public documents, content filtering/moderation with privacy, verifiable credentials, and more.

## 7. Conclusion: The Future is Verifiably Matched

-   Recap the core innovations of v2: epsilon-free NFA generation and the off-circuit path computation + in-circuit lookup verification model.
-   Reinforce the benefits and expanded capabilities.
-   (Optional: Briefly mention the upcoming detailed research paper for those who want to dive deeper).
-   Call to action: Invite readers to explore the new compiler, contribute, or build applications with it.
