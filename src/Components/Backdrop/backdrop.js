import React from 'react';
import styles from './backdrop.module.css';
import { connect } from 'react-redux';
import actionTypes from '../../Reducer/actionTypes';

const backdrop = (props) => {

    console.log(props.backdrop);

    return (
        <div className={styles.backdropMain}
             style={props.backdrop ? {display: 'block'} : {display: 'none'}}
             onClick={() => props.toggleSidedrawer()}>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        backdrop: state.backdrop
    }
}

const mapDispatchToProps = dispatch => {
    return {
        toggleSidedrawer: () => dispatch({ type: actionTypes.TOOGLE_SIDEDRAWER })
    }
}

export default connect ( mapStateToProps, mapDispatchToProps ) (backdrop);
