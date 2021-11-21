import * as React from 'react';
import PropTypes from 'prop-types';
import './Sea.css';
import atlantis from './assets/atlantis.png';
import logoLarge from './assets/logo_tp.png';
import { Box, } from '@mui/system';
import Wave from 'react-wavify';
import MapPicker from 'react-google-map-picker'
import { Avatar, Grid, Dialog, DialogTitle, DialogContent, DialogContentText, Typography, Button, TextField } from '@mui/material';
import { Fade } from "react-awesome-reveal";
import axios from 'axios';
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";

const endpoint = 'http://34.159.48.17:55/api/v1';

const DefaultLocation = { lat: 53.168127997729336, lng: 8.650962948660363 };
const DefaultZoom = 10;

function AddItemDialog(props) {
    const { onClose, item, open } = props;

    const handleClose = () => {
        onClose();
    };

    const { isAuthenticated, user } = useAuth0();
    const history = useNavigate();

    const [email, setEmail] = React.useState('');

    React.useEffect(() => {
        async function checkUser() {
            if (isAuthenticated) {
                setEmail(user.email);
            } else {
                //history("/login");
            }
        }
        checkUser();                            // called async checkUser()
    }, [isAuthenticated]);

    const [itemName, setItemName] = React.useState('');
    const handleItemNameChange = (event) => {
        setItemName(event.target.value);
    };

    const [lostDate, setLostDate] = React.useState('');
    const handleLostDateChange = (event) => {
        setLostDate(event.target.value);
    };

    const [prize, setPrize] = React.useState('');
    const handlePrizeChange = (event) => {
        setPrize(event.target.value);
    };

    const [description, setDescription] = React.useState('');
    const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
    };

    const [defaultLocation, setDefaultLocation] = React.useState(DefaultLocation);

    const [location, setLocation] = React.useState(defaultLocation);
    const [zoom, setZoom] = React.useState(DefaultZoom);

    function handleChangeLocation(lat, lng) {
        setLocation({ lat: lat, lng: lng });
    }

    function handleChangeZoom(newZoom) {
        setZoom(newZoom);
    }

    function handleResetLocation() {
        setDefaultLocation({ ...DefaultLocation });
        setZoom(DefaultZoom);
    }

    const handleSubmit = () => {
        console.log(itemName, prize, description);
        console.log(location);
        console.log('email', email);
        axios.post(endpoint + '/add_laf_item', {
            user_name: email,
            item_name: itemName,
            item_description: description,
            item_location: 'Bremen',
            item_images: 'http://dummyimage.com/872x939.png/5fa2dd/ffffff',
            lost_date: lostDate,
            reward_price: prize
        })
            .then(function (response) {
                console.log(response);
                onClose();
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    return (
        <Dialog fullWidth maxWidth='md' onClose={handleClose} open={open}>
            <DialogTitle>
                <Grid container spacing={2} justifyContent="center"
                    alignItems="center" direction="column">
                    <Grid item>
                        <Avatar
                            variant="rounded"
                            alt='Item Image'
                            src={''}
                            sx={{ width: 250, height: 250 }}
                        />
                    </Grid>
                    <Grid item><TextField fullWidth id="outlined-basic" type='text' label="Item Name" variant="outlined" value={itemName}
                        onChange={handleItemNameChange} /></Grid>
                </Grid>
            </DialogTitle>
            <Box>
                <DialogContent>
                    <Grid container direction='column' spacing={2}>
                        <Grid item><TextField fullWidth
                            margin="dense"
                            id="date"
                            label="Date of Loss"
                            type='text'
                            value={lostDate}
                            onChange={handleLostDateChange}
                            variant="outlined" /></Grid>
                        <Grid item><TextField fullWidth
                            margin="dense"
                            id="prize"
                            label="Prize"
                            type='number'
                            value={prize}
                            onChange={handlePrizeChange}
                            variant="outlined" /></Grid>
                        <Grid item><TextField fullWidth
                            margin="dense"
                            id="description"
                            type='text'
                            label="Description"
                            value={description}
                            onChange={handleDescriptionChange}
                            multiline
                            rows={5}
                        /></Grid>
                        <Grid item>
                            <MapPicker defaultLocation={defaultLocation}
                                zoom={zoom}
                                mapTypeId="roadmap"
                                style={{ height: '200px' }}
                                onChangeLocation={handleChangeLocation}
                                onChangeZoom={handleChangeZoom}
                                apiKey='AIzaSyD07E1VvpsN_0FvsmKAj4nK9GnLq-9jtj8' />
                        </Grid>
                        <Grid item alignSelf='start'>
                            <Button variant='contained' onClick={handleSubmit}>
                                Find My Atlantis
                            </Button>
                        </Grid>
                    </Grid>
                </DialogContent>
            </Box>
        </Dialog>
    );
}

function ItemDialog(props) {
    const { onClose, item, open } = props;

    const handleClose = () => {
        onClose();
    };

    return (
        <Dialog fullWidth onClose={handleClose} open={open} scroll='paper'>
            <DialogTitle>
                <Grid container justifyContent="center"
                    alignItems="center" direction="column">
                    <Grid item>
                        <Avatar
                            variant="rounded"
                            alt={item.id}
                            src={item.image}
                            sx={{ width: 250, height: 250 }}
                        />
                    </Grid>
                    <Grid item fontSize='h2.fontSize'>{item.name}</Grid>
                </Grid>
            </DialogTitle>
            <Box>
                <DialogContent dividers={true}>
                    <DialogContentText>
                        <Box fontWeight='bold' fontSize='h3.fontSize' color='black'>User</Box>
                        {item.user}
                    </DialogContentText>
                </DialogContent>
                <DialogContent dividers={true}>
                    <DialogContentText>
                        <Box fontWeight='bold' fontSize='h3.fontSize' color='black'>Prize</Box>
                        {item.prize}
                    </DialogContentText>
                </DialogContent>
                <DialogContent dividers={true}>
                    <DialogContentText>
                        <Box fontWeight='bold' fontSize='h3.fontSize' color='black'>Description</Box>
                        {item.description}
                    </DialogContentText>
                </DialogContent>
            </Box>
        </Dialog>
    );
}

ItemDialog.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    item: PropTypes.object.isRequired,
};

export default function Sea() {

    const data = [{ "id": 1, "name": "Sweater", "description": "My grandma made it for me!", "user": "gseward0@huffingtonpost.com", "prize": 27.4, "image": "https://www.na-kd.com/globalassets/nakd_chunky_long_oversized_turte_neck_sweater-1100-005467-0004_01g.jpg", "latitude": 53.8979973863563, "longitude": 8.89195460775998 },
    { "id": 2, "name": "Phone", "description": "It's really precious to me. I got it on my 19th birthday.", "user": "nwintersgill1@yolasite.com", "prize": 7.84, "image": "https://images.indianexpress.com/2021/04/Asus-ROG-Phone-5-1200.jpg", "latitude": 53.67228602082196, "longitude": 8.3414884021011 },
    { "id": 3, "name": "Charger", "description": "Can't live without my phone...", "user": "dboylin2@tripod.com", "prize": 11.86, "image": "https://cdn.thegrommet.com/media/catalog/resized/product/fill_w-762_h-572_bg-%23ffffff/3/3/3392-S-101_BST.jpg", "latitude": 53.63885649669302, "longitude": 8.23958496923488 },
    { "id": 4, "name": "Laptop", "description": "It has all my business files. Please help me find it!", "user": "hmeake3@behance.net", "prize": 23.17, "image": "https://cdn.pocket-lint.com/r/s/1200x/assets/images/155087-laptops-review-microsoft-surface-laptop-go-review-image1-6ezitk9ymj.jpg", "latitude": 53.62776114546042, "longitude": 8.00432889796053 },
    { "id": 5, "name": "Ring", "description": "It's my 31 year old wedding ring :(", "user": "garrault4@theglobeandmail.com", "prize": 6.06, "image": "https://ion.r2net.com/sets/Jewelry/Custom/Ring/S01xH01/S01xH01xPC_RND/S01xH01xPC_M2_RND_DIM_wht_0100CT_W_W/Stg_480X380.jpg", "latitude": 53.47773121141045, "longitude": 8.89841235226803 },
    { "id": 6, "name": "Necklace", "description": "My ex before my last ex gave it to me, I still love him!", "user": "ucowlard5@accuweather.com", "prize": 8.23, "image": "https://cdn.shopify.com/s/files/1/1726/4473/products/ba-necklace-grit-gold-v2.jpg", "latitude": 53.10823321849404, "longitude": 8.61770970011399 },
    { "id": 7, "name": "Chocolate", "description": "I didn't even start eating it :/", "user": "pmation6@cnet.com", "prize": 4.63, "image": "https://m.media-amazon.com/images/I/91qi6PV+XBL._SX425_.jpg", "latitude": 53.61695847509916, "longitude": 8.79869930243156 },
    { "id": 8, "name": "Birthday Card", "description": "My bestie gave it to me. It means a lot to me.", "user": "rlorkin7@ft.com", "prize": 19.52, "image": "https://5.imimg.com/data5/AS/NS/MP/SELLER-1217060/musical-greeting-card-happy-birthday-500x500.jpg", "latitude": 53.30904141240472, "longitude": 8.695874481 },
    { "id": 9, "name": "Bag", "description": "It's an original Gucci!", "user": "ljiruch8@squidoo.com", "prize": 2.44, "image": "https://i.pinimg.com/custom_covers/222x/401101979252099625_1510317635.jpg", "latitude": 53.17471249970205, "longitude": 8.20102851389192 },
    { "id": 10, "name": "Headband", "description": "I always wear it for sports. That is why I hardly wear it. Please help me find it.", "user": "bbetun9@umn.edu", "prize": 10.5, "image": "https://www.compressport.com/inter/25772-large_default/running-thin-headband-bluelolite.jpg", "latitude": 53.99652263163999, "longitude": 8.09690585814018 }]
        ;

    const messages = ['Looking for more?', 'Maybe Atlantis is at the bottom of this ocean.\n Just Kidding. Or Am I?', 'There is one way to find out.', 'Atlantis is waiting...', 'Keep Going!', 'You got this!', '', '', 'Wait for it...', ''];

    const handleClickOpen = (d) => {
        setDialogItem(d);
        setOpen(true);
    };

    const handleAddItem = () => {
        setAddItemOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleAddItemClose = () => {
        setAddItemOpen(false);
    }

    function randomInteger(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    const buildItems = (data) => {
        const listItems = data.map((d) => <Grid item width={1}
            paddingLeft={randomInteger(20, 80) + 'vw'}
            marginTop={randomInteger(20, 80) + 'vh'}>
            <Avatar
                onClick={() => handleClickOpen(d)}
                alt={d.id}
                src={d.image}
                sx={{ width: 250, height: 250, border: 1, borderColor: 'grey.50', borderWidth: 4 }}
            />
        </Grid>);
        return listItems;
    }

    const [open, setOpen] = React.useState(false);
    const [AddItemOpen, setAddItemOpen] = React.useState(false);
    const [items, setItems] = React.useState(buildItems(data));
    const [dialogItem, setDialogItem] = React.useState(data[0]);

    const [bgColor, setBgColor] = React.useState('#1976D2');

    function shadeColor(color, percent) {

        var R = parseInt(color.substring(1, 3), 16);
        var G = parseInt(color.substring(3, 5), 16);
        var B = parseInt(color.substring(5, 7), 16);

        R = parseInt(R * (100 + percent) / 100);
        G = parseInt(G * (100 + percent) / 100);
        B = parseInt(B * (100 + percent) / 100);

        R = (R < 255) ? R : 255;
        G = (G < 255) ? G : 255;
        B = (B < 255) ? B : 255;

        var RR = ((R.toString(16).length == 1) ? "0" + R.toString(16) : R.toString(16));
        var GG = ((G.toString(16).length == 1) ? "0" + G.toString(16) : G.toString(16));
        var BB = ((B.toString(16).length == 1) ? "0" + B.toString(16) : B.toString(16));

        return "#" + RR + GG + BB;
    }
    var p = -30;
    const handleOnVisibilityChange = (inView, entry) => {
        if (inView) {
            setBgColor(shadeColor(bgColor, p));
            p = p - 20;
        }
    }


    return (
        <div>
            <Grid
                container
                spacing={0}
                direction="column"
                justifyContent="center"
                alignItems="center"
                marginTop={5}
            >
                <Grid item>
                    <Box textAlign='center'>
                        <img src={logoLarge} height='300'></img>
                    </Box>
                </Grid>
                <Grid item>
                    <Box marginLeft={-20} marginTop={8} alignContent='center' justifyContent='center'>
                        <Button variant='outlined' onClick={handleAddItem}>I lost my Atlantis</Button>
                    </Box>
                </Grid>
                <Grid item paddingTop={8}>
                    Or help find someone's Atlantis...
                </Grid>
                <Grid item>
                    <Box width='100vw'>
                        <Wave fill={bgColor}
                            paused={false}
                            options={{
                                height: 100,
                                amplitude: 20,
                                speed: 0.25,
                                points: 3
                            }}
                        />
                    </Box>
                </Grid>
                <Grid item>
                    <Box marginTop={-2} minHeight='50vh' width='100vw' style={{
                        backgroundColor: bgColor,
                        transition: "all .5s ease",
                        WebkitTransition: "all .5s ease",
                        MozTransition: "all .5s ease"
                    }}>
                        <Grid container
                            spacing={0}
                            direction="column"
                            justifyContent="space-between"
                            alignItems="center">
                            {items}
                        </Grid>
                    </Box>
                </Grid>
                <Grid item>
                    <Box height='1000vh' sx={{ width: '100vw' }} style={{
                        backgroundColor: bgColor,
                        transition: "all .5s ease",
                        WebkitTransition: "all .5s ease",
                        MozTransition: "all .5s ease"
                    }}>
                        <Box height='10vh' />
                        <Fade triggerOnce={true} onVisibilityChange={handleOnVisibilityChange}>
                            {messages.map((m) => (<Typography paddingX='10vw' marginTop='100vh' variant="h2" align='center' fontWeight='bold' gutterBottom component="div" sx={{ fontFamily: 'Montserrat', color: 'white' }}>
                                {m}
                            </Typography>))}</Fade>
                        <Fade triggerOnce={true} onVisibilityChange={handleOnVisibilityChange}>
                            <Typography paddingX='10vw' marginTop='100vh' variant="h2" align='center' fontWeight='bold' component="div" sx={{ fontFamily: 'Montserrat', color: 'white' }}>
                                I didn't say it was the smart thing, but it is the right thing.<br/> - Milo James Thatch
                            </Typography></Fade>
                    </Box>
                </Grid>
            </Grid>
            <Box maxWidth='100vw' sx={{ backgroundImage: atlantis }}>
                <img src={atlantis} width='100%'></img>
            </Box>
            <ItemDialog onClose={handleClose} item={dialogItem} open={open} />
            <AddItemDialog onClose={handleAddItemClose} open={AddItemOpen} />
        </div>
    );
}