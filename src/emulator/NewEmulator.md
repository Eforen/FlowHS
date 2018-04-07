# State Store
* Emulator
  * Step
  * SleepTime
    1. -1: Manual
      Updates are run by something else the Step action is called from outside the emulator.
    2.  0: Continuse
      Runs as fast as it can. If there is a change it will change as soon as it can.
    3. 1+: Fixed
      Changed every X number of milliseconds.
  * Changed
    Reflects if any nodes at all have changed if not then it just increments the Step Timer and does not worry about it
  * Nodes
    * ID
    * Name
    * Type
    * Inputs
      * Value
    * Outputs
      * Value
      * Connections (Array of Node IDs)
    * Changed

# Actions
* Emulator Actions
  * Step
  * FlipBit
  * Builtin Components
    * Update Input Bits?
