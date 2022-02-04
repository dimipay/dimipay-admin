export const ColorBubble: React.FC<{ color: string }> = ({ color }) => (
    <div
        style={{
            width: "2rem",
            height: "2rem",
            backgroundColor: color,
            borderRadius: "2rem",
        }}
    />
)
