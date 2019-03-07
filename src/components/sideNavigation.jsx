// /*********************************************************************************
//  *  @Purpose        : To write the code for side navigation bar used in dashBoard
//  *  @file           : sideNavigation.jsx        
//  *  @author         : HITHESH G R
//  *  @version        : v0.1
//  *  @since          : 23-02-2019
//  *********************************************************************************/
// import React from 'react';
// import Drawer from '@material-ui/core/Drawer';
// import List from '@material-ui/core/List';
// import Divider from '@material-ui/core/Divider';
// import IconButton from '@material-ui/core/IconButton';
// import MenuIcon from '@material-ui/icons/Menu';
// import ListItem from '@material-ui/core/ListItem';
// import ListItemIcon from '@material-ui/core/ListItemIcon';
// import ListItemText from '@material-ui/core/ListItemText';
// import InboxIcon from '@material-ui/icons/MoveToInbox';
// import MailIcon from '@material-ui/icons/Mail';
// import "../App.css";
// export default class persistentDrawer extends React.Component {
//   state = {
//     open: false,
//   };
//   /**
//    * @description:it will use toggle the current action event
//    */
//   handleToggle = () => {
//     this.setState(state => ({ open: !state.open }));
//   };
//   render() {
//     const { open } = this.state;
//     return (
//       <div>
//         <div className="root">
//           <IconButton
//             color="inherit"
//             aria-label="Open drawer"
//             onClick={this.handleToggle}
//           >
//             <div className="menuIcon" title="Main menu">  <MenuIcon /></div>
//           </IconButton>
//           <Drawer
//             variant="persistent"
//             anchor="left"
//             open={open}
//             className="drawerPaper"
//           >
//             <List>
//               {['Notes', 'Reminders'].map((text, index) => (
//                 <ListItem button key={text}>
//                   <ListItemIcon>{index % 2 === 0 ?
//                     <img src={require("../assets/images/bulb.svg")} alt="" /> :
//                     <img src={require("../assets/images/bellIcon.svg")} alt="" />}
//                   </ListItemIcon>
//                   <ListItemText primary={text} />
//                 </ListItem>
//               ))}
//             </List>
//             <Divider />
//             <List>
//               <List>
//                 {['Edit labels'].map((text, index) => (
//                   <ListItem button key={text}>
//                     <ListItemIcon>{index % 2 === 0 ?
//                       <img src={require("../assets/images/mode_edit_grey_24x24.png")} alt="" color="gray" /> :
//                       <MailIcon />}</ListItemIcon>
//                     <ListItemText primary={text} />
//                   </ListItem>
//                 ))}
//               </List>
//               <Divider />
//             </List>
//             <List>
//               {['Archive', 'Trash'].map((text, index) => (
//                 <ListItem button key={text}>
//                   <ListItemIcon>{index % 2 === 0 ?
//                     <InboxIcon /> : <img src={require("../assets/images/delete_grey_24x24.png")} alt="" />}
//                   </ListItemIcon>
//                   <ListItemText primary={text} />
//                 </ListItem>
//               ))}
//             </List>
//           </Drawer>
//         </div>
//       </div>
//     );
//   }
// }
