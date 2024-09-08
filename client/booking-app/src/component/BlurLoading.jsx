const LoadingPage = () => {
  return (
    <div style={styles.overlay}>
      <div style={styles.spinner}></div>
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
};

const styles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(255, 255, 255, 0.8)", // Slightly transparent white background
    backdropFilter: "blur(5px)", // Blurring the background
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 9999,
  },
  spinner: {
    width: "50px",
    height: "50px",
    border: "6px solid #f3f3f3", // Light gray
    borderTop: "6px solid #3498db", // Blue
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
  },
};

export default LoadingPage;
