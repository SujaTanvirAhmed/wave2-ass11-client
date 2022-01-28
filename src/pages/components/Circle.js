export default function Circle() {
    const circleStyle = {
        width: "75px",
        height: "75px",
        borderRadius: "50%",
        backgroundColor: "#555",
        margin: "10px auto"
    };
    return (
        <div style={circleStyle}></div>
    );
}