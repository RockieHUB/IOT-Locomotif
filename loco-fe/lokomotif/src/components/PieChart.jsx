import { Pie } from "react-chartjs-2";

// eslint-disable-next-line react/prop-types
function PieChart({ chartData }) {
  return (
    <div className="chart-container">
      <h2 style={{ textAlign: "center" }}>Grafik Data Status Lokomotif</h2>
      <Pie
        data={chartData}
        options={{
          plugins: {
            title: {
              display: true,
              text: "Perbandingan Lokomotif",
            },
          },
        }}
      />
    </div>
  );
}
export default PieChart;
