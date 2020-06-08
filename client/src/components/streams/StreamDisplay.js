import React from 'react';
import flv from 'flv.js';
import { connect } from 'react-redux';
import { fetchStreamById } from '../../actions';
import { AtomSpinner } from 'react-epic-spinners'

class StreamShow extends React.Component {
    constructor(props) {
        super(props);

        this.videoRef = React.createRef();

    }

    componentDidMount() {
        const id = String(this.props.match.params.id)
        this.props.fetchStreamById(id);
        this.buildPlayer();
    }

    componentDidUpdate() {
        this.buildPlayer();
    }

    componentWillUnmount() {
        this.player.destroy();
    }

    buildPlayer() {
        if (this.player || !this.props.stream) {
            return
        }

        const id = String(this.props.match.params.id)
        this.player = flv.createPlayer({
            type: 'flv',
            url: 'http://localhost:8000/live/' + id + '.flv'
        });

        this.player.attachMediaElement(this.videoRef.current);
        this.player.load();
    }

    render() {
        if (!this.props.stream) {
            return <AtomSpinner/>
        }

        return (
            <div>
                <video ref={this.videoRef} style={{ width: '100%' }} controls={true} />
                <h1>{this.props.stream.title}</h1>
                <h5>{this.props.stream.description}</h5>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return { stream: state.streams[ownProps.match.params.id] }
}

export default connect(mapStateToProps, { fetchStreamById })(StreamShow);