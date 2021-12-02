import React from 'react';
import useModal from './hooks/use-modal';

const WrappedModal = ({ Component, ...props }) => {
	const [modalState, modalDispatch] = useModal();

	return <Component {...props} modalState={modalState} {...modalDispatch} />;
};

export const withModal = (Component) => (props) => {
	return <WrappedModal {...props} Component={Component} />;
};

export default withModal;
