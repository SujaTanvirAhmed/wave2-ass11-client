export default function Triangle(props) {
    const triangleStyle = {
        width: "0",
        height: "0",
        borderLeft: "75px solid transparent",
        borderRight: "75px solid transparent",
        borderBottom: "150px solid #555",
        margin: "30px auto",
        transform: `rotate(${props.rotation}deg)`
    };
    return (
        <div style={triangleStyle}></div>
    );
}