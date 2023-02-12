export const getTimesSaved = () => JSON.parse(localStorage.getItem("times"));

export const saveTime = (totalTime) => {
  const areTimeSaved = getTimesSaved();
  console.log(areTimeSaved);

  if (areTimeSaved && areTimeSaved.length > 0) {
    // pusheo el nuevo tiempo y ordeno el array
    const savedTimes = JSON.stringify(
      [...areTimeSaved, totalTime].sort((a, b) => a - b).slice(0, 3)
    );
    localStorage.setItem("times", savedTimes);
  } else {
    // guardo el total times x 1era vez
    const newTime = JSON.stringify([totalTime]);
    localStorage.setItem("times", newTime);
  }
};
