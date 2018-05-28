import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchAllPosts, deletePost, votePost } from '../actions/posts'
import { ListGroup, ListGroupItem, Col, Row, Button, Glyphicon, ButtonToolbar } from 'react-bootstrap'
import _ from 'lodash';
import Moment from 'react-moment';
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
import Comments from './Comments'

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

    deleteButtonPress = id => {
        this.props.deletePost(id, () => { });
    }

    postList() {
        const { posts, classes, votePost } = this.props;
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
                                                <BottomNavigationAction onClick={deletePost(`${post.id}`)} label="Delete" icon={<Delete />} />
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
                                <IconButton onClick={() => votePost(post.id, 'upVote')} color="primary" aria-label="Like">
                                    <ThumbUp />
                                </IconButton>
                                <IconButton onClick={() => votePost(post.id, 'downVote')} color="primary" aria-label="Unlike">
                                    <ThumbDown />
                                </IconButton>
                                <IconButton href={`/${post.category}/${post.id}`}  aria-label="Comments">
                                    <Badge badgeContent={post.commentCount} color="primary">
                                        <ChatBubbleOutLine color="primary" />
                                    </Badge>
                                </IconButton>

                                <Typography component="p">
                                    Date: <Moment format="DD/MM/YYYY">{post.timestamp}</Moment>
                                </Typography>
                            </CardActions>
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

export default connect(mapStateToProps, { fetchAllPosts, deletePost, votePost })(withStyles(styles)(PostList));