# 2022 Eth-Latam-workshop-solidity

- Solidity workshop repository for Buenos Aires ETH-Latam

### Overview

- Compile:

```bash
yarn compile
```

- Test:

```bash
yarn test
```

- The gas reporter plugin will be executed at the end of the tests. The file where the coverage info will be located is at ./coverage/index.html

* Deploy:

  - Using the hardhat-deploy plugin:
    ```bash
    yarn deploy
    ```
  - Example flat hardhat
    ```bash
    yarn deploy:evolution
    ```

* Run contract-sizer:
  ```bash
  yarn size-contracts
  ```

---

## Content

#### Solidity evolution

- Usage of a simple lock contract through solidity versions starting from version 0.4.x

#### Reentrancy

- Series of contracts to perform a reentrancy attack

  - ReentrancyVictim: contract who will suffer the reentrancy attack.
  - ReentrancyProtected: contract protected from the attack using a custom solution
  - ReentrancyWithOZ: contract protected from reentrancy using the ReentrancyGuard contract from Open Zeppelin.
  - ReentrancyAttacker: contract who will hack and drain funds from ReentrancyVictim

- Examples:

```bash
    yarn reentrancy-example-1
    yarn reentrancy-example-2
    yarn reentrancy-example-3
```

#### Emergency stop pattern

- StoppablePattern: Contract which implements the pattern using a custom solution
- OzStoppablePattern: Contract that inherits a contract with the pattern made by Open Zeppelin

#### Gas and space saving tips

- Series of contracts/snippets for gas optimizations and space savings:

  - constants contracts: Series of contracts to show usage of constant and immutable keywords

    - NoConstants
    - Immutable
    - Constant

  - Snippets folder:
    - Reason strings: use short require strings to save space.
    - Storage: contracts to show usage and importance of Events to save data in the Blockchain.
    - Packing: Example of packing and non-packing structs.

### Authors

- [Alejo Lovallo](https://github.com/AlejoLovallo)
- [Lucas Marc](https://github.com/lucas-marc)
- [T&D-Twitter](https://twitter.com/thinkanddev)
- [T&D-Facebook](https://www.facebook.com/ThinkandDev)
- [T&D-Instagram](https://www.instagram.com/thinkanddevok/)
- [T&D-LinkedIn](https://www.linkedin.com/company/think-and-dev-llc/)
- [T&D-Web](https://thinkanddev.com)
- Mails: HIRING@THINKANDDEV.COM | HELLO@THINKANDDEV.COM
