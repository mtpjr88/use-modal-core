import React from 'react';
import Draggable from 'react-draggable';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import Dialog, { DialogProps } from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Backdrop from '@mui/material/Backdrop';
import { ModalComponentProps, ModalCloseMechanism } from '.';
import { ModalAriaLabel } from './types';
import { makeStyles } from '@mui/styles';

type BaseModalProps = ModalComponentProps & DialogProps;

const DEFAULT_CONTAINER_STYLES: React.CSSProperties = {
	backgroundColor: 'transparent',
	boxShadow: '0px 0px',
	marginTop: '100px', //remCalc(-50)
	width: '100%',
	height: '100%',
	display: 'flex',
	flex: 1,
	maxHeight: '100vh',
	maxWidth: '90vw',
	overflow: 'hidden',
	padding: 0,
	margin: 0
};

const DEFAULT_PAPER_STYLES: React.CSSProperties = {
	backgroundColor: 'transparent',
	boxShadow: '0px 0px',
	marginTop: '100px', // remCalc(-50),
	maxHeight: '100vh',
	maxWidth: '90vw',
	overflow: 'hidden',
	padding: 0,
	margin: 0
};

const PaperDrag = ({ ...props }) => {
	return (
		<Draggable handle='#draggable-handle'>
			<Paper {...props} />
		</Draggable>
	);
};

export const BaseModal: React.FC<BaseModalProps> = ({
	open,
	variant,
	onClose,
	getContainerStyles,
	getPaperStyles,
	options = {},
	titleText = '',
	Title,
	CloseButton,
	children,
	ariaLabel,
	...dialogProps
}) => {
	const classes = useStyles();
	const styles =
		getContainerStyles?.(DEFAULT_CONTAINER_STYLES) ?? DEFAULT_CONTAINER_STYLES;
	const paperStyles =
		getPaperStyles?.(DEFAULT_PAPER_STYLES) ?? DEFAULT_PAPER_STYLES;
	const maybeDraggableProps = options.draggable && {
		PaperComponent: PaperDrag
	};

	const handleOnClose = (e) => {
		if (options.closeOnBackdropClick) {
			onClose(e, ModalCloseMechanism.BACKDROP_CLICK);
		}
	};

	const handleOnClickClose = (e) => {
		onClose(e, ModalCloseMechanism.ICON_CLICK);
	};

	const MaybeBackDropComponent = options.Backdrop && {
		BackdropComponent: () => (
			<Backdrop style={{ backgroundColor: 'rgba(0, 0, 0, 0.8)' }} open={open}>
				{options.Backdrop}
			</Backdrop>
		)
	};

	return open ? (
		<Dialog
			aria-labelledby={ModalAriaLabel.id}
			tabIndex={0}
			open={open}
			onClose={handleOnClose}
			PaperProps={{
				style: paperStyles,
				...(options.draggable && { tabIndex: -1 })
			}}
			{...maybeDraggableProps}
			{...dialogProps}
			{...MaybeBackDropComponent}
		>
			{Title && (
				<>
					<Title text={titleText}>
						{CloseButton && (
							<CloseButton
								tabIndex={-1}
								aria-label='close'
								onClick={handleOnClickClose}
							/>
						)}
					</Title>
					<Divider />
				</>
			)}
			{!Title && CloseButton && (
				<>
					<DialogTitle className={classes.baseTitleClass}>
						<CloseButton aria-label='close' onClick={handleOnClickClose} />
					</DialogTitle>
					<Divider />
				</>
			)}
			<DialogContent tabIndex={-1} style={styles}>
				{children}
			</DialogContent>
		</Dialog>
	) : null;
};

const useStyles = makeStyles({
	baseTitleClass: {
		padding: '10px 24px',
		backgroundColor: 'white'
	}
});

export default BaseModal;
