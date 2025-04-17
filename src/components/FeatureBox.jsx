//홈페이지에 featurebox가 6개  반복되기때문에 따로 컴포넌트 분리
//Separate the component because "featurebox" is repeated 6 times on the homepage.

function FeatureBox({ icon, title, description }) {
  return (
    <div className="feature-box">
      <h2>
        {icon} {title}
      </h2>
      <p>{description}</p>
    </div>
  );
}

export default FeatureBox;
