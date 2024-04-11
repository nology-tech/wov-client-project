import Layout from "../../components/Layout/Layout";
import Account from "../../components/Account/Account";
import Register from "../../components/Register/Register";
const Home = () => {
  // "today" shows current day, only used in the Home page.
  const today = new Date(),
    date =
      today.getDate() +
      " " +
      today.toLocaleString("default", { month: "long" }) +
      " " +
      today.getFullYear();

  return (
    <Layout>
      <Header subtitle="Home" />
      <HeaderHome
        date={date}
        location="Malvern Hills"
        image="https://s3-alpha-sig.figma.com/img/9003/31aa/6dd32f49cc5bf6f29932b0481a2af856?Expires=1713744000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=FrjVJj2XFAnoifxYaGoHI0CfbBKprDFMJqDeV1ur21HRwi~j1ZYNRCW-3LPZchYU-brnUydqEOyJ8eUfwA9nB6ATjPomas0~pIPizR9gu2Je79kN9EP1pmgZjI3K6aKUXz7IoMgEErOcHxjXyt42pBlu1Ym8~HfjFPcrLW1igtrvA6JO9y997SJDeldC1ENK0Y8myy9wViW54XoUX1ripSdMlgX9NG2pa--C1P1eafFfIzyQyWrB-Uz8e9eWq0va0JvsDInxsaRT1wOvxHVAxGc~nyK5VJwcSVlplUeTEEL~fMMPrn31K8dbJHlxd0bGEGobas-1vWFzvzv~01QwUw__"
      />
      <h2>Section Heading</h2>
      <h3>Panel Heading</h3>
    </Layout>
  );
};

export default Home;
