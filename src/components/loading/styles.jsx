import { makeStyles, createStyles } from "@material-ui/styles";

export const useStyles = makeStyles(_theme =>
    createStyles({
        loadingMask: {
            height: "100%",
            width: "100%",
            position: "fixed",
            zIndex: 2000,
            background: "rgba(38, 50, 56, 0.9)",
        },
        contents: {
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            textAlign: "center",
        },
        message: {
            color: "white",
        },
        progress: {
            color: "white",
        },
        divider: {
            margin: "40px",
        },
    })
);
