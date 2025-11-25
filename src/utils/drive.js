export const getDrivePositionsAndImpactValues = (route) => {
  const { nodes } = route;
  const positions = [];
  const impactValues = [];
  nodes.forEach((node) => {
    positions.push([node.latitude, node.longitude]);
    impactValues.push({ x: new Date(node.timestamp).getTime(), y: node.impactValue });
  });
  console.log(impactValues);
  return { positions, impactValues };
}