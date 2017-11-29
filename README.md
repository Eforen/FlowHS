# FlowHS
Flow Based Hardware Simulator

![Screenshot of FlowHS](https://github.com/Eforen/FlowHS/raw/master/mediaDev/AlphaScreenShot.PNG)

# Features
- [x] Recent Files List
- [x] Chip Names Independent from filename
- [x] Chip Save/LOAD
- [x] Brute Force Chip Tester (Truth Table Builder)
- [ ] Customizable Chip Tester (Truth Table Tester) {Only Test Select Pin Combinations}
- [x] Titlebar Reflects the state of the file and what the current ChipName is
- [ ] Chip Pin Renaming
- [ ] Toggle PinIN or Constant with Keyboard Hotkey
- [ ] Embed Chips inside other chips to easily build up complex chips from simpler chips
- [ ] Library of general purpose logic chips like Mux chips, Adders, etc...
- [ ] Keyboard Input Functionality
- [ ] Black and White Screen Functionality
- [ ] Build-in Chips allow Optional Clock Based Delay for realism
- [ ] Color Screen Functionality
- [ ] Sound Functionality
- [ ] Arduino based hardware interfacing functionality

# Benefits of Built-in Chips
 * Built-in chips both provide a starting point.
 * If you don't want to work at a super low level they are ready for you to use.
 * Because all built-in chips are just raw programming logic not emulated hardware, they can preform faster then the simulated equivalent.

# Built-in Chips
- [x] 1 Bit Pin-IN
- [x] 1 Bit Pin-OUT
- [x] 1 Bit dip switch / constant
- [x] NOT   (1 BIT IN, 1 BIT OUT)
- [x] OR    (2 BIT IN, 1 BIT OUT)
- [x] AND   (2 BIT IN, 1 BIT OUT)
- [x] NOR   (2 BIT IN, 1 BIT OUT)
- [x] NAND  (2 BIT IN, 1 BIT OUT)
- [x] XOR   (2 BIT IN, 1 BIT OUT)
- [x] XNOR  (2 BIT IN, 1 BIT OUT)

- [ ] NOT   (1 BUS IN, 1 BUS OUT)
- [ ] OR    (2 BUS IN, 1 BUS OUT)
- [ ] AND   (2 BUS IN, 1 BUS OUT)
- [ ] NOR   (2 BUS IN, 1 BUS OUT)
- [ ] NAND  (2 BUS IN, 1 BUS OUT)
- [ ] XOR   (2 BUS IN, 1 BUS OUT)
- [ ] XNOR  (2 BUS IN, 1 BUS OUT)

- [ ] OR    (1 BUS IN, 1 BIT OUT)
- [ ] AND   (1 BUS IN, 1 BIT OUT)
- [ ] NAND  (1 BUS IN, 1 BIT OUT)

- [ ] MUX  (1 BIT IN, 1 BIT Select, A BIT OUT, B BIT OUT)
- [ ] DMUX  (A BIT IN, B BIT IN, 1 BIT Select, 1 BIT OUT)

- [ ] D FlipFlop (DATA BIT, LOAD BIT, CLOCK BIT, BIT OUT)
- [ ] Counter 8Bit (8 BIT BUS IN, LOAD BIT, INC BIT, RESET BIT, CLOCK BIT, 8 BIT BUS OUT)
- [ ] Counter 16Bit (16 BIT BUS IN, LOAD BIT, INC BIT, RESET BIT, CLOCK BIT, 16 BIT BUS OUT)
- [ ] Counter 32Bit (32 BIT BUS IN, LOAD BIT, INC BIT, RESET BIT, CLOCK BIT, 32 BIT BUS OUT)
- [ ] Counter 64Bit (64 BIT BUS IN, LOAD BIT, INC BIT, RESET BIT, CLOCK BIT, 64 BIT BUS OUT)

- [ ] Variable Size RAM (64 BIT BUS IN, LOAD BIT, INC BIT, RESET BIT, CLOCK BIT, 64 BIT BUS OUT)

- [ ] ADD
- [ ] SUBTRACT
- [ ] MULTIPLY
- [ ] DIVIDE

# Known Bugs

* Mouse must be moved at least a little between spawning nodes or only the first click will spawn a node
* Explodes a little bit if you alt+f4 the editor window and then try to open a new file. simple fix but I don't care right now just don't do that.
