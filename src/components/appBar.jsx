/*************************************************************************************
 *  @Purpose        : Here we have to create dashboard.
 *  @file           : dashboard.jsx        
 *  @author         : HITHESH G R
 *  @version        : v0.1
 *  @since          : 23-02-2019
 ************************************************************************************/
import React from "react";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import { Tooltip,MuiThemeProvider, createMuiTheme } from "@material-ui/core";
import MenuIcon from '@material-ui/icons/Menu'
import DrawerMenu from '../components/drawerMenu';
import CardsView from "../components/cardsView";
import UserProfile from  "../components/userProfile"
//import SideNavigation from "../components/sideNavigation";
import "../App.css";

const theme = createMuiTheme({
    overrides: {
        MuiDrawer: {
            paperAnchorLeft: {
                top: 70,
                width: 200,
                background: 'white'
            },
            paperAnchorDockedLeft: {
                borderColor: "white"
            }
        },
        MuiAppBar: {
            root: {
                display: 'flex',
                flexDirection: "row"

            },
    
            colorPrimary: {
                color: "gray",
                fontSize: 25,
                fontFamily: "georgia"
            },

        },
        MuiToolbar: {
            regular: {
                display: "flex",
                justifyContent: "space-between",
                width: "100%"
            }
        },
        MuiMenuItem: {
            root: {
                borderBottomRightRadius: "25px",
                borderTopRightRadius: "25px",
                height: "30px"
            },
        },

    },
    typography: {
        useNextVariants: true,
    },
})

export default class dashBoard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            left: true,
            open: false,
            searchNote:""
        };
        this.handleAppbar = this.handleAppbar.bind(this);
        this.handleSearchBar = this.handleSearchBar.bind(this);
    }

    handleToggle = () => {
        this.props.slideCards();
        this.setState({ open: !this.state.open });
    }
    
    handleSearchBar(evt) {
        this.setState({ searchNote: evt.target.value });
        this.props.getSearchedNotes(evt.target.value)
    }
    handleAppbar() {
        this.props.notePropsToApp();
    }
    searchLabels(value) {
        this.props.searchLabels(value)
    }
    render() {
        // const { open } = this.state;
        return (
            <div>
                <div className="root">
                <MuiThemeProvider theme={theme}>
                    <AppBar position="fixed" color="inherit">
                        <Toolbar>
                        {/* <SideNavigation /> */}
                        <div id="appBarMenu">
                            <div>
                                <IconButton color="inherit" aria-label="Open drawer" >
                                    <Tooltip title="Menu">
                                        <MenuIcon id="menu" onClick={this.handleToggle} />
                                    </Tooltip>
                                </IconButton>
                            </div>
                        </div>
                            <div className="keepImage">
                                <img src={require("../assets/images/keep_48dp.png")}
                                    alt="" />
                            </div>
                            <div className="fundoTitle">
                                <span>Fundoo</span>
                            </div>
                            <div className="search">
                                <div className="searchIcon">
                                <Tooltip title="Search">
                                    <SearchIcon />
                                    </Tooltip>
                                </div>
                                <div className="searchField">
                                    <InputBase 
                                    id="searchInputBase"
                                    value={this.state.searchNote}
                                    onChange={this.handleSearchBar}
                                    placeholder="Search" 
                                    className="inputRoot" 
                                    />
                                </div>
                            </div>
                            <div className="appList">
                            <CardsView appPropstoCardsView={this.handleAppbar} />
                            </div>
                            <div>
                               <UserProfile/>
                            </div>
                        </Toolbar>
                        <DrawerMenu
                        appBarProps={this.state.open}
                        handleNavigation={this.props.handleNavigation}
                        searchLabels={(value) => this.searchLabels(value)}
                        makeLabelFalse={this.props.makeLabelFalse} />
                    </AppBar>
                    </MuiThemeProvider>
                </div>
            </div>
        );
    }
}
export { dashBoard };