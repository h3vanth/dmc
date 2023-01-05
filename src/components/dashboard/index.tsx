import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import Products from "./Products";
import { useAppSelector } from "../../ducks";
import { ProductData } from "./Product";

interface TabPanelProps {
  children?: React.ReactNode;
  dir?: string;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
    value: index,
  };
}

const Dashboard: React.FC = () => {
  const [value, setValue] = React.useState(0);
  const { products = [] } = useAppSelector((state) => ({
    products: state.products,
  }));

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <>
      <Tabs value={value} onChange={handleChange} aria-label="tabs">
        {["All", "Available"].map((label, index) => (
          <Tab key={label} label={label} {...a11yProps(index)} />
        ))}
      </Tabs>
      <TabPanel value={value} index={0}>
        <Products products={products} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Products
          products={products.filter(
            (product: ProductData) => product.isAvailable
          )}
        />
      </TabPanel>
    </>
  );
};

export default Dashboard;
