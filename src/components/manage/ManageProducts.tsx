import * as React from "react";
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";

import EditableProductRow from "./EditProduct";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../ducks";
import AddProduct from "./AddProduct";
import { ProductData } from "../dashboard/Product";
import { commonActions } from "../../ducks/actions/common";
import { fetchProducts } from "../../ducks/actions/products";

interface EnhancedTableProps {
  numSelected: number;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const { onSelectAllClick, numSelected, rowCount } = props;

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              "aria-label": "select all products",
            }}
          />
        </TableCell>
        {[
          "Product name",
          "Available quantity",
          "Price (₹)",
          "Availability status",
        ].map((headCell) => (
          <TableCell
            key={headCell}
            align={headCell === "Availability status" ? "center" : "left"}
            padding={"normal"}
          >
            {headCell}
          </TableCell>
        ))}
        <TableCell />
      </TableRow>
    </TableHead>
  );
}

interface EnhancedTableToolbarProps {
  numSelected: number;
  setOpenAddProduct: React.Dispatch<React.SetStateAction<boolean>>;
  handleDelete: () => void;
}

function EnhancedTableToolbar(props: EnhancedTableToolbarProps) {
  const { numSelected, setOpenAddProduct, handleDelete } = props;

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: "1 1 100%" }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Grid container justifyContent="space-between">
          <Grid item>
            <Typography
              sx={{ flex: "1 1 100%" }}
              variant="h6"
              id="tableTitle"
              component="div"
            >
              Products
            </Typography>
          </Grid>
          <Grid item>
            <Button color="primary" onClick={() => setOpenAddProduct(true)}>
              Add product
            </Button>
          </Grid>
        </Grid>
      )}
      {numSelected > 0 && (
        <Tooltip title="Delete">
          <IconButton onClick={() => handleDelete()}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
}

export default function EnhancedTable() {
  const [selected, setSelected] = React.useState<readonly string[]>([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [openAddProduct, setOpenAddProduct] = React.useState(false);
  const { products } = useSelector((state: RootState) => ({
    products: state.products,
  }));
  const dispatch: AppDispatch = useDispatch();

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = products.map((product) => product.productId);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (name: string) => selected.indexOf(name) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - products.length) : 0;

  const handleDelete = () => {
    dispatch(commonActions.toggleLoaderState());
    fetch(`http://localhost:8080/api/v1/products/${selected.join("-")}`, {
      method: "DELETE",
    }).then((response) => {
      dispatch(commonActions.toggleLoaderState());
      if (response.ok) {
        dispatch(
          commonActions.showSnackbar({
            message: "Product(s) deleted",
            severity: "success",
          })
        );
        dispatch(fetchProducts());
        setSelected([]);
      } else {
        dispatch(
          commonActions.showSnackbar({
            message: "Deletion failed",
            severity: "error",
          })
        );
      }
    });
  };

  return (
    <>
      <Box sx={{ width: "100%" }}>
        <Paper sx={{ width: "100%", mb: 2 }}>
          <EnhancedTableToolbar
            numSelected={selected.length}
            setOpenAddProduct={setOpenAddProduct}
            handleDelete={handleDelete}
          />
          <TableContainer>
            <Table
              sx={{ minWidth: 750 }}
              aria-labelledby="tableTitle"
              size="medium"
            >
              <EnhancedTableHead
                numSelected={selected.length}
                onSelectAllClick={handleSelectAllClick}
                rowCount={products.length}
              />
              <TableBody>
                {/* if you don't need to support IE11, you can replace the `stableSort` call with:
              rows.sort(getComparator(order, orderBy)).slice() */}
                {products
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((product, index) => {
                    const isItemSelected = isSelected(product.productId);
                    const labelId = `enhanced-table-checkbox-${index}`;

                    return (
                      <EditableProductRow
                        key={product.productId}
                        selected={selected}
                        setSelected={setSelected}
                        product={product}
                        isItemSelected={isItemSelected}
                        labelId={labelId}
                      />
                    );
                  })}
                {emptyRows > 0 && (
                  <TableRow
                    style={{
                      height: 53 * emptyRows,
                    }}
                  >
                    <TableCell colSpan={4} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={products.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </Box>
      <AddProduct open={openAddProduct} setOpen={setOpenAddProduct} />
    </>
  );
}
