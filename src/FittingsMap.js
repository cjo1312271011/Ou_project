const genFittingsMap = (type) => {
  return {
    id: `${type}Id`,
    name: `${type}Name`,
    price: `${type}Price`,
    tag: `${type}Tag`,
    image: `${type}Image`,
  };
};

const swappedObj = (obj) =>
  Object.fromEntries(Object.entries(obj).map(([key, value]) => [value, key]));

export const cpuProps = genFittingsMap("cpu");
export const boardProps = genFittingsMap("board");
export const diskProps = genFittingsMap("disk");
export const graphicsProps = genFittingsMap("graphics");
export const memoryProps = genFittingsMap("memory");

export const swapCpuProps = swappedObj(cpuProps);
export const swapBoardProps = swappedObj(boardProps);
export const swapDiskProps = swappedObj(diskProps);
export const swapGraphicsProps = swappedObj(graphicsProps);
export const swapMemoryProps = swappedObj(memoryProps);

export const propsMap = {
  ["cpu"]: cpuProps,
  ["board"]: boardProps,
  ["disk"]: diskProps,
  ["graphics"]: graphicsProps,
  ["memory"]: memoryProps,
};

export const swapPropsMap = {
  ["cpu"]: swapCpuProps,
  ["board"]: swapBoardProps,
  ["disk"]: swapDiskProps,
  ["graphics"]: swapGraphicsProps,
  ["memory"]: swapMemoryProps,
};

// init getData => ok

// update ==>  cpuId-> id  id->cpuId

// delete ==> cpuId -> id

// add ==> id -> cpuId
