var React = require('react');
var videoChatStore = require('../stores/videoChatStore');

var VideoChat = React.createClass({
  getInitialState: function(){
    return { 
      localStream: '',
      remoteStream: ''
    };
  },

  componentDidMount: function(){
    videoChatStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function(){
    videoChatStore.removeChangeListener(this._onChange);    
  },

  _onChange: function() {
    this.setState({
      localStream: videoChatStore.getLocalStream(),
      remoteStream: videoChatStore.getRemoteStream()
    });
  },

  render: function(){
    var videoNodes = this.state.map(function(src, key) {
      if (src) {
        return (<video id={key} src={src} autoPlay></video>);
      }
    })

    return (
      <div>
        <div>This is the Video Chat Hooray Hooray Hooray!</div>
        {videoNodes}
      </div>
    );
  }
});

module.exports = VideoChat;

// Order of operations in React
// 1. componentWillMount
// 2. render
// 3. componentDidMount
// 4. componentWillReceiveProps is called whenever there is a change to props.
// Used to react to a prop change before render is called
// 5. componentWillUnmount is invoked immediately beore a component is unmounted from the DOM
