import streams from '../apis/streams';
import history from '../history';
import {
    SIGN_IN,
    SIGN_OUT,
    CREATE_STREAM,
    FETCH_STREAM_BY_ID,
    FETCH_STREAMS,
    DELETE_STREAM,
    EDIT_STREAM
}
    from './actionType';

export const signIn = (userId) => {
    return {
        type: SIGN_IN,
        payload: userId
    };
};

export const signOut = () => {
    return {
        type: SIGN_OUT
    };
};

export const createStream = (formValues) => async (dispach, getState) => {
    const { userId } = getState().auth;
    const response = await streams.post('/streams', { ...formValues, userId });
    try{
        dispach({ type: CREATE_STREAM, payload: response.data });

        //programatic navitation after creating stream
        history.push('/');
    }catch(err){
        console.log('Stream can not created')
    }
};

export const fetchStreams = () => async dispach => {
    const response = await streams.get('/streams');

    dispach({ type: FETCH_STREAMS, payload: response.data });
};

export const fetchStreamById = (id) => async dispach => {
    const response = await streams.get('/streams/' + id);

    dispach({ type: FETCH_STREAM_BY_ID, payload: response.data });
}

export const editStream = (id, formValues) => async dispach => {
    const response = await streams.patch('/streams/' + id, formValues);

    dispach({ type: EDIT_STREAM, payload: response.data });

    //programatic navigation after creating stream
    history.push('/');
}

export const deleteStream = (id) => async dispach => {
    await streams.delete('/streams/' + id);

    dispach({ type: DELETE_STREAM, payload: id });
    
    //programatic navigation after creating stream
    history.push('/');
}