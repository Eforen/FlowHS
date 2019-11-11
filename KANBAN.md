- [FlowHS Kanban](#FlowHS-Kanban)
  - [Done](#Done)
    - [Done 2019-11-9](#Done-2019-11-9)
    - [Done 2019-11-10](#Done-2019-11-10)
    - [Next Commit 2019-11-10](#Next-Commit-2019-11-10)
  - [Testing](#Testing)
  - [Doing](#Doing)
  - [Backlog](#Backlog)
    - [v0.1](#v01)
    - [v0.2](#v02)
    - [v0.3](#v03)
    - [v0.4](#v04)
    - [v0.5](#v05)
    - [v0.6](#v06)
    - [v0.7](#v07)
    - [v0.8](#v08)
    - [v0.9](#v09)
    - [v1.0](#v10)
    - [v1.1](#v11)
    - [v1.2](#v12)
    - [v1.3](#v13)
    - [v1.4](#v14)
    - [v1.5](#v15)
    - [v1.6](#v16)
    - [v1.7](#v17)
    - [v1.8](#v18)
    - [v1.9](#v19)
    - [v2.0](#v20)

# FlowHS Kanban

## Done
### Done 2019-11-9
* [Main] Titlebar Drag Move Window
* [Main] Titlebar Minimize Window
* [Main] Titlebar Close Window
* [Editor] Show Editor Window
* [Editor] Show Grid in background
* [Editor][Node] RenderNode Color

### Done 2019-11-10
* [Editor][Node] RenderNode Out pins
* [Editor][Node] RenderNode Pos based on grid tiles
* [Editor][Node] RenderNode Hover
* [Editor][Node] RenderNode Pin Hover
* [Editor][Node] RenderNode Select
* [Editor][Node] RenderNode In pins
* [Editor][Node] RenderNode Title
* [Editor][Node] RenderNode Title Cause Resize width
* [Editor][Node] RenderNode Icon Cause Resize width
* [Editor][Node] RenderNode State Flip Button (left)
* [Editor] Convert Editor to Class Based Component
* [Editor] Setup Store
* [Editor][Node] RenderNodeX component that takes a GUID and renders a RenderNode based on that GUID in store
* [Editor] merge RenderNodeX and RenderNode
* [BUG][Editor] RenderNode Flashes when draged
* [Editor] Move workspace settings from editor component to store
* [Editor][Node] RenderNode Click Drag to move
* [Editor][Node] Click grid unselects any selection

### Next Commit 2019-11-10
* [BUG][Editor] All RenderNodes move when any are draged

## Testing

## Doing
* [Editor] Show Pallet on the Left

## Backlog
### v0.1
* [BUG][Editor] should switch select if drag source is not in selected
* [Editor][Store] Delete Node from store nodes and flow (Action and Mutation)
* [Editor][Store] Delete Connection from store nodes and flow (Action and Mutation)
* [Editor][Node] RenderNode State Indicator (right) (Support For multi bit buses)
* [Editor][Node] RenderNode Property Inspector on double click
* [Editor][Node] RenderNode State Flip Button (left) functionality
* [Editor][Node] RenderNode Use Vuex to store state
* [Editor] Calapsable Inspecrtor on right
* [Editor] Calapsable New Node List on left
* [Main] Titlebar Drag Move Window
* [Main] Titlebar Minimize Window
* [Main] Titlebar Close Window
* [Editor] Titlebar Reflects the state of the file and what the ChipName is
* [Editor] Chip Names independent from filename
* [Editor] Chip Save/LOAD
* [Editor] Chip Embed in other Files
* [Editor] Allow Click drag around background infinitly
* [Editor] Node Renderer
* [Editor] Node Connection Renderer
* [Builtin Chips] 1 Bit Pin-IN
* [Builtin Chips] 1 Bit Pin-OUT
* [Builtin Chips] 1 Bit Dip Switch / Constant

### v0.2
* Chips Via Plugins
* [Builtin Chips] NOT (1 BIT IN, 1 BIT OUT)
* [Builtin Chips] OR (2 BIT IN, 1 BIT OUT)
* [Builtin Chips] AND (2 BIT IN, 1 BIT OUT)

### v0.3
* [Main][No Project Loaded] New Project 
* [Main][No Project Loaded] Open Project Folder
* [Main][No Project Loaded] Recent Projects List
* [Main][No Project Loaded] Recent Files List

### v0.4
* [Editor] Brute Force Chip Tester (Truth Table Builder)

### v0.5
* Customizable Chip Tester (Truth Table Tester) {Only Test Select Pin Combinations}
* [Chips Plugin][Simple] NOR (2 BIT IN, 1 BIT OUT)
* [Chips Plugin][Simple] NAND (2 BIT IN, 1 BIT OUT)
* [Chips Plugin][Simple] XOR (2 BIT IN, 1 BIT OUT)
* [Chips Plugin][Simple] XNOR (2 BIT IN, 1 BIT OUT)

### v0.6
* [Emulator] Bus Support
* [Editor] Bus Support

### v0.7
* [Chips Plugin][Basic Bus] NOT (1 BUS IN, 1 BUS OUT)
* [Chips Plugin][Basic Bus] OR (2 BUS IN, 1 BUS OUT)
* [Chips Plugin][Basic Bus] AND (2 BUS IN, 1 BUS OUT)
* [Chips Plugin][Simple Bus] NOR (2 BUS IN, 1 BUS OUT)
* [Chips Plugin][Simple Bus] NAND (2 BUS IN, 1 BUS OUT)
* [Chips Plugin][Simple Bus] XOR (2 BUS IN, 1 BUS OUT)
* [Chips Plugin][Simple Bus] XNOR (2 BUS IN, 1 BUS OUT)
* [Chips Plugin][MUX] MUX (1 BIT IN, 1 BIT Select, A BIT OUT, B BIT OUT)
* [Chips Plugin][MUX] DMUX (A BIT IN, B BIT IN, 1 BIT Select, 1 BIT OUT)

### v0.8
* [Chips Plugin][Memory] D FlipFlop (DATA BIT, LOAD BIT, CLOCK BIT, BIT OUT)
* [Chips Plugin][Counter] Counter 8Bit (8 BIT BUS IN, LOAD BIT, INC BIT, RESET BIT, CLOCK BIT, 8 BIT BUS OUT)
* [Chips Plugin][Counter] Counter 16Bit (16 BIT BUS IN, LOAD BIT, INC BIT, RESET BIT, CLOCK BIT, 16 BIT BUS OUT)
* [Chips Plugin][Counter] Counter 32Bit (32 BIT BUS IN, LOAD BIT, INC BIT, RESET BIT, CLOCK BIT, 32 BIT BUS OUT)
* [Chips Plugin][Counter] Counter 64Bit (64 BIT BUS IN, LOAD BIT, INC BIT, RESET BIT, CLOCK BIT, 64 BIT BUS OUT)
* [Chips Plugin][Counter] Variable Size RAM (64 BIT BUS IN, LOAD BIT, INC BIT, RESET BIT, CLOCK BIT, 64 BIT BUS OUT)

### v0.9
* [Chips Plugin][Math] ADD
* [Chips Plugin][Math] SUBTRACT
* [Chips Plugin][Math] MULTIPLY
* [Chips Plugin][Math] DIVIDE

### v1.0

### v1.1

### v1.2

### v1.3

### v1.4

### v1.5

### v1.6

### v1.7

### v1.8

### v1.9
* Chip Pin Renaming
* Toggle PinIN or Constant with Keyboard Hotkey
* Embed Chips inside other chips to easily build up complex chips from simpler chips
* Library of general purpose logic chips like Mux chips, Adders, etc...
* Keyboard Input Functionality
* Black and White Screen Functionality
* Build-in Chips allow Optional Clock Based Delay for realism
* Color Screen Functionality
* Sound Functionality

### v2.0
* Arduino based hardware interfacing functionality