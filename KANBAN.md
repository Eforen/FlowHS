- [FlowHS Kanban](#flowhs-kanban)
  - [Done](#done)
    - [Done 2019-11-9](#done-2019-11-9)
    - [Done 2019-11-10](#done-2019-11-10)
    - [Next Commit 2019-11-19](#next-commit-2019-11-19)
  - [Testing](#testing)
  - [Doing](#doing)
  - [Backlog](#backlog)
    - [v0.1](#v01)
    - [v0.2](#v02)
    - [v0.3](#v03)
    - [v0.4 (Quality of Life upgrade)](#v04-quality-of-life-upgrade)
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
* [BUG][Editor] All RenderNodes move when any are draged
* [BUG][Editor] should switch select if drag source is not in selected
* [BUG][Editor] Allow shift select of multiple nodes
* [Editor][Node] make a node type class that stores all the configurations of the parameters and such
* [Editor][Node] Make the node type class able to take a parameters object and supply a parameters object that defines what the parameters should be
* [Editor][Node] Make a node elemxent take a node type object and its parameters object
* [Editor][Node] Make a node proxy element take a node type argument and its parameters
* [Editor][Workspace] Make workspace only show grid when there is a flow loaded
* [Editor][Palette] Display headers properly
* [BUG][Editor][NodeProxy] When button is not shown the space is not taken up by body
* [Editor][CMD] Make a command store that stores every command run by the Run Command action
* [Editor][CMD] Stelth Run Command action (does not store action just does it)
* [Editor][CMD] Add History action (just adds a command to the history as if it was run)
* [Editor][CMD] Add node command
* [Editor][CMD] Delete node command
* [Editor][CMD] Editor register key shortcut and send command Undo
* [Editor][CMD] Editor register key shortcut and send command Redo
* [Editor][CMD] Make a undo Command action that takes the most recent command and runs its undo function
* [Editor][Store] Delete Node from store nodes and flow (Action and Mutation)

### Next Commit 2019-11-19
* [Editor][CMD] moveNode Command
* [Editor][CMD] Editor register key shortcut and send command Move Up
* [Editor][CMD] Editor register key shortcut and send command Move Down
* [Editor][CMD] Editor register key shortcut and send command Move Left
* [Editor][CMD] Editor register key shortcut and send command Move Right

## Testing

## Doing
* [Editor] Show Pallet on the Left
* [Editor] Workspace Store

## Backlog
### v0.1 
* [Editor][CMD] make a combinable check on commands that sees if actions can be combined in history instead of adding a new action (method that returns true or false and if returning true it returns a combined version of the action)
* [Editor][CMD] allow moveNode to combine
* [Editor][CMD] Editor register key shortcut to move nodes will move it 10x based on setting in workspace store when shift is pressed at the same time
* [Editor][Node] node proxy component have a command object that will be run on successful drop
* [Editor][CMD] impliment redo where actions that are undone are added to the redoHistory list
* [Editor][File Management] Add flow tabs functionality
* [Editor][CMD] Clump command (takes mutliple other commands and runs them sequencially as a single command in the history)
* [Editor][Store] Delete Connection from store nodes and flow (Action and Mutation)
* Be redundent with data a little for speed by storing all flowIDs a node is in in the node
* Be redundent with data a little for speed by storing all connectionIDs a node is in in the node
* Be redundent with data a little for speed by storing all flowIDs a connection is in in the connection
* [Editor][Node] RenderNode State Indicator (right) (Support For multi bit buses)
* [Editor][Node] RenderNode Property Inspector on double click
* [Editor][Node] RenderNode State Flip Button (left) functionality
* [Editor][Node] RenderNode Use Vuex to store state
* [Editor][Node] Show loaded flows above the workspace in tabs
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

### v0.4 (Quality of Life upgrade)
* [Builtin Chips] 1 Bit Dip Switch / Constant
* [Editor][Palette] Make catagories collapsable
* Scroll position of grid should be in store and should reflect the state of the store
* On scroll the store should be updated
* the scroll position being in the store should allow us to also put the width in the store
* Have a timer that runs and action every so often. This action would take a mod position that is the opposite of everything in the case where we wanted to scroll left or up more than we could at that point in time. It uses this mod position to offset everything starting center point, all node positions, etc.
* Fire an action on window resize that ensures that the current window area is within the bounds of the grid and makes the grid bigger if needed.
* Middle or shift dragging the workspace scrolls the space by moving the center point as it exists in the store everything else about the grid size and true scroll  position are all handled by the store actions/mutations
* [Editor] Brute Force Chip Tester (Truth Table Builder)
* [BUG][Editor] Sometimes when moving mouse around quickly and letting go of button the drag does not stop (This seems to be related to if the mouse is over a node when mouse up happens)

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