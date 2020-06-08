import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Modal from '../Modal';
import history from '../../history';
import { fetchStreamById, deleteStream } from '../../actions';

class StreamDelete extends React.Component {

    componentDidMount() {
        this.props.fetchStreamById(this.props.match.params.id);
    }

    renderActions() {
        const id = this.props.match.params.id;
        return (
            //same as div, but does not show any html, keeps all element into 1 root for jsx render
            <React.Fragment>
                <button onClick={() => this.props.deleteStream(id)} className="ui button negative" >Delete</button>
                <Link to="/" className="ui button">Cancel</Link>
            </React.Fragment>
        );
    }

    renderContent() {
        if (!this.props.stream) {
            return 'Are you sure you want to delete this stream?'
        }

        return 'Are you sure want to delete the stream with title: ' + this.props.stream.title
    }

    render() {
        console.log('delete', this.props.match.params.id)
        return (
            <Modal
                title="Delete Stream"
                content={this.renderContent()}
                actions={this.renderActions()}
                onDismiss={() => history.push('/')}
            />
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return { stream: state.streams[ownProps.match.params.id] }
};

export default connect(mapStateToProps, { fetchStreamById, deleteStream })(StreamDelete);