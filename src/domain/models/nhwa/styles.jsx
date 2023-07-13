export const styles = theme => ({
    root: {
        display: "flex",
        justifyContent: "center",
        backgroundColor: "#fff",
    },
    container: {
        marginRight: "auto",
        marginLeft: "auto",
        width: "95%",
        [theme.breakpoints.up(1200)]: {
            width: "92%",
        },
        [theme.breakpoints.up(1400)]: {
            width: "80%",
        },
        [theme.breakpoints.up(1600)]: {
            width: "65%",
        },
        [theme.breakpoints.up(1800)]: {
            width: "60%",
        },
    },
    item: {
        textAlign: "left",
        textDecoration: "none",
        "&:hover": {
            backgroundColor: "#f9f9f9",
        },
        cursor: "pointer",
    },
    notification: {
        fontSize: "17px",
        fontWeight: "bold",
        color: "#DC143C",
    },
    separator: {
        textAlign: "left",
        margin: 5,
    },
    separatorTitle: {
        fontWeight: "bold",
        textTransform: "none",
        fontSize: "16px",
        color: "#00762e",
        backgroundColor: "#c2d69b",
        padding: "7px",
        marginBottom: "7px",
    },
    title: {
        color: "#000000",
    },
    iconContainer: {
        display: "flex",
        alignItems: "center",
    },
    icon: {
        margin: 15,
        height: "60px",
        float: "left",
    },
    smallIcon: {
        margin: 15,
        height: "35px",
        float: "left",
    },
    description: {
        marginLeft: 15,
        marginRight: 15,
    },
    small: {
        fontSize: "14px",
    },
    bottomLine: {},
});
