import React from 'react';
const DATA = [{
letter: 'Q',
keycode: 81,
id: 'Open-HH', 
url: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3'},
{letter: 'W',
keycode: 87,
id: 'Closed-HH',
url: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3'
}, 
{
letter: 'E',
keycode: 69,
id: 'Kick-and-Hat',
url: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3'},
{
letter: 'A',
keycode: 65,
id: 'Punchy-Kick',
url: 'https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3'
},
{
letter: 'S',
keycode: 83,
id: 'Kick',
url: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3'
},
{
letter: 'D',
keycode: 68,
id: 'Snare',
url: 'https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3'
},
{
letter: 'Z',
keycode: 90,
id: 'Side-Stick',
url: 'https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3'
},
{
letter: 'X',
keycode: 88,
id: 'Clap',
url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3'
},
{
letter: 'C',
keycode: 67,
id: 'Shaker',
url: 'https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3'
}
];

const onStyle = {transform: "scale(0.95)", boxShadow: "1px 1px 4px 4px white, -1px -1px 4px 4px white"};
const offStyle = {transform: "scale(1)", boxShadow: "none"};


export class Pad extends React.Component{
constructor(props){
    super(props);
    this.state = {
        playing: false
    };
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.onPlay = this.onPlay.bind(this);
}

componentDidMount() {
    document.addEventListener('keydown', this.handleKeyPress);
}

componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyPress)
}

handleKeyPress (e) {
    if (e.keyCode === this.props.pad.keycode) {
        this.onPlay();
    }
}

onPlay () {
    const sound = document.getElementById(this.props.pad.letter);
    sound.currentTime = 0;
    sound.play();
    this.props.updateDisplay(this.props.pad.id);
    this.setState({playing: true})
    setTimeout(() => {
        this.setState({playing: false})
        }, 100);
    
}
render(){
const style = this.state.playing ? onStyle : offStyle;
var outerDrumPad = {
    width: '120px',
    height: '120px',
    background: 'white',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '50%',
    margin: '10px'
    };
var drumPad = {
    width: '97%',
    height: '97%',
    background: 'radial-gradient(#333, #070707)',
    borderRadius: '50%',
    textAlign: 'center',
    verticalAlign: 'middle',
    lineHeight: '120px',
    fontSize: '24px',
    color: 'rgba(255, 255, 255, 1)',
    cursor: 'pointer',
    userSelect: 'none'
       
}
var sidePanel = {
    height: '100%',
    width: '40%',
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    color: 'white',
    textAlign: 'center',
    fontSize: '20px'
}

  return (
    <div style={{...style, ...outerDrumPad}}>
    <div style={drumPad}
         id={this.props.pad.id}
         onClick={this.onPlay}
         >
         <audio id={this.props.pad.letter}
                src={this.props.pad.url}
                className="clip"
                >
                </audio>
                {this.props.pad.letter}
     </div>
    </div>
  );}
}

export class SidePanel extends React.Component {
    constructor(props){
        super(props);
    }
    render () {
        const style = {background: '#063d0f', boxShadow: 'none'};
        var sidePanel = {
            height: '100%',
            width: '40%',
            padding: '20px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
           // alignItems: 'center',
            color: 'white',
            textAlign: 'center',
            fontSize: '20px'
        }
        var display = {
            width: '200px',
            height: '20px',
            margin: '20px auto',
            padding: '5px',
            fontSize: '20px',
            background: 'white',
            border: '2px solid #333',
            borderRadius: '3px',
            color: 'black',
            marginBottom: '250px'
            //background: '#476b68'
}
        var label = {
            color: 'white', 
            fontStyle: 'italic',
            textAlign: 'center',
            fontSize: '24px',
            top: '200px'
        }
        return (
            <div style={sidePanel}>
            <div style={label}><h3>React Drum Machine</h3></div>
            <div style={{...this.props.colorStyle, ...display}} id='display'>{this.props.currentSound}</div>
            </div>
        )
    }

}

export default class App extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            power: true
        }
        this.updateDisplay = this.updateDisplay.bind(this);
        }

        updateDisplay (id) {
            this.setState({currentSound: id});
        }

        render () {
            const colorStyle = {background: '#476b68'};
            const data= DATA;
            const pads = data.map((pad, i) => {
                return <Pad key={i}
                            pad={pad}
                            updateDisplay={this.updateDisplay}
                            style={colorStyle}
                            />
            });
            var container = {
                width: '100%',
                height: '100vh',
                display: 'flex',
                justifyContent: 'center',
                background: 'white',
                fontFamily: '"Audiowide", monospace'
            }
            var machine = {
                maxWidth: '800px',
                width: '100%',
                display: 'flex',
                padding: '20px',
                margin: '50px',
                background: 'black',
                borderRadius: '5px',
                boxShadow: '5px 5px 3px grey'
            }
            var pads1 = {
                display: 'flex',
                flexWrap: 'wrap',
                width: '60%'
            }
            return (
                <div style={container}>
                <div style={machine}>
                <div style={pads1}>
                {pads}
                </div>
                <SidePanel currentSound={this.state.currentSound}
                            colorStyle={colorStyle}

                        />

                </div>

                </div>
            )
        }

}
