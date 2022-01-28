export default function ReviewItem({ review }) {
    return (
        <div
            style={{
                borderBottom: "1px solid gray",
                padding: "15px 30px",
                marginTop: "10px",
                textAlign: "left"
            }}
        >
            <p style={{ fontWeight: "bold" }}>
                <span>{review?.response}</span>&nbsp;|&nbsp;
                <span>{review?.customer}</span>
            </p>
            {review.pros ? <p><span style={{ fontWeight: "bold" }}>Pros</span>: {review.pros}</p> : null}
            {review.cons ? <p><span style={{ fontWeight: "bold" }}>Cons</span>: {review.cons}</p> : null}
        </div>
    );
}