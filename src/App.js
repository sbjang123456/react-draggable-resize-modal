import { useState } from 'react';
// import makeStyles from '@material-ui/core/makeStyles';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import DraggableResizeModal from './components/common/DraggableResizeModal';

const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(2)
    }
}));

function App() {
    const classes = useStyles();
    const [open ,setOpen] = useState(false);

    const handleOpenToggle = (evt) => {
        setOpen(!open)
    };

    return (
        <div className={classes.root}>
            <Button variant="outlined" color="primary" onClick={handleOpenToggle}>
                Open alert dialog
            </Button>
            <DraggableResizeModal
                title={'모달 테스트'}
                open={open}
                width={450}
                height={450}
                onClose={handleOpenToggle}
            >
            </DraggableResizeModal>
        </div>
    );
}

export default App;
