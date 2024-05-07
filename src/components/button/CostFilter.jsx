import React from "react";

const CostFilter = ({ maxCost, onChange }) => (
  <div className="cost-filter">
    <p>Coût maximum de l'équipe :</p>
    <label>
      <input type="radio" value="10" checked={maxCost === 10} onChange={onChange} />
      <span>10</span>
    </label>
    <label>
      <input type="radio" value="15" checked={maxCost === 15} onChange={onChange} />
      <span>15</span>
    </label>
  </div>
);

export default CostFilter;
