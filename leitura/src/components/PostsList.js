import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchAllPosts } from '../actions/posts'
import { ListGroup, ListGroupItem, Col, Row, Button, Glyphicon, ButtonToolbar } from 'react-bootstrap'
import _ from 'lodash';
import Moment from 'react-moment'

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import red from '@material-ui/core/colors/red';
import ThumbUp from '@material-ui/icons/ThumbUp';
import ThumbDown from '@material-ui/icons/ThumbDown';
import ChatBubbleOutLine from '@material-ui/icons/ChatBubbleOutline';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Edit from '@material-ui/icons/Edit';
import Delete from '@material-ui/icons/Delete';
import Badge from '@material-ui/core/Badge';
import Grid from '@material-ui/core/Grid';
import Popover from '@material-ui/core/Popover';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';

const styles = theme => ({
    card: {
        maxWidth: 400,
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    actions: {
        display: 'flex',
    },
    expand: {
        transform: 'rotate(0deg)',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
        marginLeft: 'auto',
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: red[500],
    },
});

class PostList extends Component {
    state = { anchorEl: null, expanded: false };

    handleClick = event => {
        this.setState({
            anchorEl: event.currentTarget,
        });
    };

    handleClose = () => {
        this.setState({
            anchorEl: null,
        });
    };

    handleExpandClick = () => {
        this.setState({ expanded: !this.state.expanded });
    };

    componentDidMount() {
        const filter = this.props.match.params.category;
        this.props.fetchAllPosts(filter);
        console.log(this.props)
    }

    postList() {
        const { posts, classes } = this.props;
        const { anchorEl } = this.state;

        if (posts) {
            return _.map(posts, post => {
                return (

                    <Grid item xs={6} sm={4}>
                        <Card className={classes.card}>
                            <CardHeader
                                avatar={
                                    <Avatar aria-label="Recipe" className={classes.avatar}>
                                        {post.voteScore}
                                    </Avatar>
                                }
                                action={
                                    <div>
                                        <IconButton onClick={this.handleClick} >
                                            <MoreVertIcon />
                                        </IconButton>
                                        <Popover
                                            open={Boolean(anchorEl)}
                                            anchorEl={anchorEl}
                                            onClose={this.handleClose}
                                            anchorOrigin={{
                                                vertical: 'bottom',
                                                horizontal: 'center',
                                            }}
                                            transformOrigin={{
                                                vertical: 'top',
                                                horizontal: 'center',
                                            }}
                                        >
                                            <BottomNavigation
                                                showLabels
                                                className={classes.root}
                                            >
                                                <BottomNavigationAction label="Edit" icon={<Edit />} />
                                                <BottomNavigationAction label="Delete" icon={<Delete />} />
                                            </BottomNavigation>
                                        </Popover>
                                    </div>
                                }
                                title={post.title}
                                subheader={post.category}
                            />
                            <CardContent>
                                <Typography component="p">
                                    {post.body}
                                </Typography>
                            </CardContent>
                            <CardActions className={classes.actions} disableActionSpacing>
                                <IconButton color="primary" aria-label="Like">
                                    <ThumbUp />
                                </IconButton>
                                <IconButton color="primary" aria-label="Unlike">
                                    <ThumbDown />
                                </IconButton>
                                <IconButton aria-label="Comments">
                                    <Badge badgeContent={post.commentCount} color="primary">
                                        <ChatBubbleOutLine color="primary" />
                                    </Badge>
                                </IconButton>

                                <Typography component="p">
                                    Date: <Moment format="DD/MM/YYYY">{post.timestamp}</Moment>
                                </Typography>
                                <IconButton
                                    className={classnames(classes.expand, {
                                        [classes.expandOpen]: this.state.expanded,
                                    })}
                                    onClick={this.handleExpandClick}
                                    aria-expanded={this.state.expanded}
                                    aria-label="Show more"
                                >
                                    <ExpandMoreIcon />
                                </IconButton>
                            </CardActions>
                            <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
                                <CardContent>
                                    <Typography paragraph variant="body2">
                                        Method:
              </Typography>
                                    <Typography paragraph>
                                        Heat 1/2 cup of the broth in a pot until simmering, add saffron and set aside for 10
                                        minutes.
              </Typography>
                                    <Typography paragraph>
                                        Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over medium-high
                                        heat. Add chicken, shrimp and chorizo, and cook, stirring occasionally until lightly
                                        browned, 6 to 8 minutes. Transfer shrimp to a large plate and set aside, leaving
                                        chicken and chorizo in the pan. Add pimentón, bay leaves, garlic, tomatoes, onion,
                                        salt and pepper, and cook, stirring often until thickened and fragrant, about 10
                                        minutes. Add saffron broth and remaining 4 1/2 cups chicken broth; bring to a boil.
              </Typography>
                                    <Typography paragraph>
                                        Add rice and stir very gently to distribute. Top with artichokes and peppers, and
                                        cook without stirring, until most of the liquid is absorbed, 15 to 18 minutes.
                                        Reduce heat to medium-low, add reserved shrimp and mussels, tucking them down into
                                        the rice, and cook again without stirring, until mussels have opened and rice is
                                        just tender, 5 to 7 minutes more. (Discard any mussels that don’t open.)
              </Typography>
                                    <Typography>
                                        Set aside off of the heat to let rest for 10 minutes, and then serve.
              </Typography>
                                </CardContent>
                            </Collapse>
                        </Card>
                    </Grid>
                );
            });
        }
    }

    render() {
        return (
            <div className="container">
                <Grid container spacing={24}>
                    {this.postList()}
                </Grid>
            </div>
        );
    }
}
PostList.propTypes = {
    classes: PropTypes.object.isRequired,
};
function mapStateToProps(state) {
    return { posts: state.posts }
}

export default connect(mapStateToProps, { fetchAllPosts })(withStyles(styles)(PostList));