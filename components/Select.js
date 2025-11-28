import React from 'react';

function Select({ title, options = [] }) {
  const groupSize = 10;
  const divideArrayIntoGroups = options.map((_, i, array) => array.slice(i * groupSize, (i + 1) * groupSize)).filter(subarr => subarr.length);
  return (
    <div className="group select-none">
      <div className="title p-2 cursor-pointer rounded-md hover:text-cyan-200 hover:bg-gray-600">{title}</div>
      {options?.length ? (
        <div className="options hidden group-hover:flex absolute text-gray-100 bg-gray-700 p-3 rounded-md">
          {divideArrayIntoGroups?.map((col, index) => (
            <div key={index}>
              {col?.map(i => (
                <div key={i}>
                  <div className="px-3 py-1 min-w-max hover:bg-gray-600 hover:text-cyan-200 cursor-pointer rounded-md">{i}</div>
                </div>
              ))}
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}

export default Select;
