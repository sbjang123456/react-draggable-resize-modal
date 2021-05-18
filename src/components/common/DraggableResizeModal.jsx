import React, { useEffect, useState } from 'react';
import {
    Paper,
    makeStyles,
    withStyles,
    IconButton,
    Typography,
    Divider,
} from '@material-ui/core';

import {
    Close as CloseIcon,
    Remove as RemoveIcon,
    WebAsset as WebAssetIcon
} from '@material-ui/icons';

import Draggable from 'react-draggable';
import { ResizableBox } from 'react-resizable';
import PropTypes from "prop-types";

const styles = (theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(2),
        cursor: 'move',
        userSelect: 'none',
        minWidth: 200
    },
    title: {
        fontWeight: 'bold'
    },
    closeButton: {
        position: 'fixed',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
    minimize: {
        position: 'fixed',
        right: theme.spacing(6),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    }
});

const ModalTitle = withStyles(styles)((props) => {
    const { children, classes, width, isMinimized, onMinimized, onClose, ...other } = props;
    return (
        <div className={classes.root} {...other} style={{width}}>
            <Typography variant="h6" className={classes.title}>{children}</Typography>
            {onClose ? (
                <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            ) : null}
            {onMinimized ? (
                <IconButton aria-label="close" className={classes.minimize} onClick={onMinimized}>
                    {isMinimized ? <WebAssetIcon /> : <RemoveIcon />}
                </IconButton>
            ) : null}
        </div>
    );
});

const useContentStyles = (width, height) => makeStyles((theme) => ({
    resizable: {
        position: "relative",
        "& .react-resizable-handle": {
            position: "absolute",
            userSelect: 'none',
            width: 20,
            height: 20,
            bottom: 0,
            right: 0,
            background:
                "url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA2IDYiIHN0eWxlPSJiYWNrZ3JvdW5kLWNvbG9yOiNmZmZmZmYwMCIgeD0iMHB4IiB5PSIwcHgiIHdpZHRoPSI2cHgiIGhlaWdodD0iNnB4Ij48ZyBvcGFjaXR5PSIwLjMwMiI+PHBhdGggZD0iTSA2IDYgTCAwIDYgTCAwIDQuMiBMIDQgNC4yIEwgNC4yIDQuMiBMIDQuMiAwIEwgNiAwIEwgNiA2IEwgNiA2IFoiIGZpbGw9IiMwMDAwMDAiLz48L2c+PC9zdmc+')",
            "background-position": "bottom right",
            padding: "0 3px 3px 0",
            "background-repeat": "no-repeat",
            "background-origin": "content-box",
            "box-sizing": "border-box",
            cursor: "se-resize"
        }
    },
    content: {
        padding: theme.spacing(2),
        maxHeight: height,
        maxWidth: width
    }
}));

const ModalContent = ({ width, height, isResize, children }) => {
    const classes = useContentStyles(width, height)();
    return (
        <>
            {isResize ? (
                <ResizableBox
                    height={height}
                    width={width}
                    className={classes.resizable}
                >
                    {children}
                </ResizableBox>
            ) : (
                <Paper className={classes.content}>
                    {children}
                </Paper>
            )}
        </>

    );
};

const PaperComponent = (props) => {
    return (
        <Draggable handle="#draggable-modal-title">
            <Paper {...props} />
        </Draggable>
    );
};

const useStyles = makeStyles((theme) => ({
    modal: {
        position: 'fixed',
        top: '10%',
        left: '10%',
        zIndex: 1300,
        userSelect: 'none',
    },
}));

const Modal = ({ title, children, width, height, isResize, onClose }) => {
    const classes = useStyles();
    const [isMinimized, setIsMinimized] = useState(false);

    const handleMinimized = evt => {
        setIsMinimized(!isMinimized);
    };

    useEffect(() => {
        return () => {}
    }, []);

    return (
        <PaperComponent className={classes.modal}>
            <ModalTitle
                id="draggable-modal-title"
                onClose={onClose}
                width={width}
                isMinimized={isMinimized}
                onMinimized={handleMinimized}
            >
                {title}
            </ModalTitle>
            <Divider/>
            {!isMinimized && (
                <ModalContent
                    width={width}
                    height={height}
                    isResize={isResize}
                >
                    {children}
                </ModalContent>
            )}
        </PaperComponent>
    );
};

const DraggableResizeModal = ({ open, ...other }) => {
    return (
        <>
            {open && (
                <Modal {...other} />
            )}
        </>
    );
};

DraggableResizeModal.defaultProps = {
    title: '목록',
    isResize: false,
    width: 500,
    height: 500
};

DraggableResizeModal.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func,
    isResize: PropTypes.bool,
    width: PropTypes.number,
    height: PropTypes.number,
};

export default DraggableResizeModal;