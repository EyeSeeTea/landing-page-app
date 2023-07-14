export const styles = _theme => ({
    title: {
        color: "#0067b2",
        fontSize: "24px",
        lineHeight: "0.9",
        fontWeight: "bold",
        borderBottom: "0.5px solid black",
        marginBottom: "20px",
    },
    subHeading: {
        marginTop: "40px",
        fontWeight: "bold",
        fontSize: "18px",
    },
    bulletList: {
        listStyleType: "disc",
    },
    grid: {
        display: "grid",
    },
    underline: {
        textDecoration: "underline",
        color: "#0067b2",
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
    settingsButton: {
        background: "#0067b2",
        color: "#ffffff",
        padding: "8px",
        borderRadius: "10px",
        fontWeight: "bold",
        marginLeft: "auto",
        marginRight: "0",
        display: "block",
        cursor: "pointer",
    },
    dataEntryButton: {
        background: "#0067b2",
        color: "#ffffff",
        padding: "8px",
        borderRadius: "10px",
        marginTop: "20px",
        fontWeight: "bold",
    },
    checkboxText: {
        marginLeft: "10px",
        marginRight: "10px",
    },
    footnote: {
        color: "#0067b2",
        marginTop: "40px",
        fontSize: "12px",
    },
});
