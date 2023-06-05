export const styles = _theme => ({
    title: {
        color: "#0067b2",
        fontSize: "24px",
        lineHeight: "0.3",
        fontWeight: "bold",
        borderBottom: "0.5px solid black",
        marginBottom: "20px",
    },
    grid: {
        display: "grid",
    },
    link: {
        color: "#000000",
        "&:hover": {
            textDecoration: "underline",
            color: "#0067b2",
        },
        textDecoration: "none",
        fontSize: "18px",
        fontWeight: "bold",
        lineHeight: "0",
        cursor: "pointer",
    },
    separator: {
        textAlign: "left",
        margin: 20,
    },
});
