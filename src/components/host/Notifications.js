import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Menu, MenuItem, Badge } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';

export default function Notifications() {
    const [data, setData] = useState(null);
    const [notifications, setNotifications] = useState(null);

    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    useEffect(() => {
        const get_notifications = () => {
            axios.get("http://localhost:8000/api/notifications").then(
                response => {
                    console.log(response.data);
                    setData(response.data);
                    setNotifications(response.data.notifications)
                    console.log('******');
                }
            ).catch(error => {
                console.error('Une erreur s\'est produite:', error);
            });
        }
        get_notifications();
    }, [])

    console.log("hey", data);
    console.log("eeey", notifications);
    return (
        <div>
            <nav className="navbar navbar-expand-lg bg-light navbar-light">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">{data && data.host.first_name}</a>
                    <ul className="navbar-nav d-flex flex-row me-1">
                        <li className="nav-item me-3 me-lg-0">
                            <div>
                                <Button
                                    aria-controls="notification-menu"
                                    aria-haspopup="true"
                                    onClick={handleClick}
                                    color="inherit"
                                >
                                    <Badge badgeContent={data && data.notifications_count} color="error">
                                        <NotificationsIcon />
                                    </Badge>
                                </Button>
                                <Menu
                                    id="notification-menu"
                                    anchorEl={anchorEl}
                                    open={Boolean(anchorEl)}
                                    onClose={handleClose}
                                >
                                    {notifications &&
                                        notifications.map((elem, index) => {
                                            const date = new Date(elem.created_at);
                                            const month = date.getMonth() + 1; 
                                            const year = date.getFullYear().toString().slice(-2); 
                                            return (
                                                <MenuItem key={index} onClick={handleClose}>
                                                    <Link to={`/bill_details/${elem.id}/${elem.data.bill_id}`} > <span style={{color: "red"}}>new </span> Bill Of The {`${month}/${year}`} </Link>
                                                </MenuItem>
                                            );
                                        })
                                    }
                                </Menu>
                            </div>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    )
}