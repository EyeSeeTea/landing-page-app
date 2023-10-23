export const styles = _theme => ({
    container: {
        backgroundColor: "#0072bb",
        transition: "all 0.3s",
        display: "flex",
        justifyContent: "space-between",
        padding: "25px",
    },
    logo: {
        verticalAlign: "middle",
        filter: "brightness(0) invert(1)",
        height: "100px",
        cursor: "pointer",
        margin: "auto",
    },
    titleContainer: {
        display: "flex",
    },
    title: {
        color: "white",
        lineHeight: "1.5",
        cursor: "pointer",
        textAlign: "center",
        margin: "auto",
        marginLeft: "15px",
        marginRight: "15px",
    },
    logout: {
        margin: "auto",
        padding: "15px",
    },
});
