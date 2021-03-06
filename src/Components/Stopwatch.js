import React from "react";
/**
 * PusedoCode:
 * Actions : Start,Stop,Pause,Restart
 * Set initial states isTimerOn[check if timer is on] ,timer_start[when timer starts],timerTime[amount of time]
 * Store time to extract hr,mins,secs and centisecs to work on time elements
 * Display buttons on defined conditions
 */

class Stopwatch extends React.Component {
   /*Defining States for stopwatch intially set isTimerOn : false as start state.*/
  state = {
    isTimerOn: false,
    timer_start: 0,
    timerTime: 0
  };
/**
  * Defining on click function which will call on related button 
  */
  start = () => {
     /**Setting state true to start and using Date.now for extra accuracy and to make it more accurate*/
    this.setState({
      isTimerOn: true,
      timerTime: this.state.timerTime,
      timer_start: Date.now() - this.state.timerTime
    });
    /**using call back function to call after every 10 ms use predefine setInterval */
    this.timer = setInterval(() => {
      this.setState({
        timerTime: Date.now() - this.state.timer_start
      });
    }, 10);
  };
    /**setting isTimerOn to false to stop the stopwatch. */
  stop = () => {
    this.setState({ isTimerOn: false });
    clearInterval(this.timer);
  };
  /**make the state 0 to reset the state for new start call */
  resetTimer = () => {
    this.setState({
      timer_start: 0,
      timerTime: 0
    });
  };


  render() {
const { timerTime } = this.state;

   /**
         * extracting time in hrs,mins,seconds and centiseconds.
         * using Math.floor to round the number and using mod to have exact the number.abs
         * appending 0 as string in the begining of result and use slice to take up two values
         * storing in a variable to later display on front end as two digit value
         * 
         **/

let centi_Sec = ("0" + (Math.floor(timerTime / 10) % 100)).slice(-2);
let seconds = ("0" + (Math.floor(timerTime / 1000) % 60)).slice(-2);
let mins = ("0" + (Math.floor(timerTime / 60000) % 60)).slice(-2);
let hrs = ("0" + Math.floor(timerTime / 3600000)).slice(-2);
    return (
      <div className="Stopwatch">
        <div><h3>Stopwatch</h3></div>
        <div className="display">
          {hrs} : {mins} : {seconds} : {centi_Sec}

          {/* using JSX syntax for if-else checking on state to implement function on button */}
          {this.state.isTimerOn === false && this.state.timerTime === 0 && (
            <button onClick={this.start}>Start</button>
          )}
          {this.state.isTimerOn === true && (
            <button onClick={this.stop}>Stop</button>
          )}
          {this.state.isTimerOn === false && this.state.timerTime > 0 && (
            <button onClick={this.start}>Pause</button>
          )}
          {this.state.isTimerOn === false && this.state.timerTime > 0 && (
            <button onClick={this.resetTimer}>Reset</button>
          )}
        </div>
      </div>
    );
  }
}
export default Stopwatch;