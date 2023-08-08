import FuseScrollbars from '@fuse/core/FuseScrollbars';
import _ from '@lodash';
import Checkbox from '@material-ui/core/Checkbox';
import Icon from '@material-ui/core/Icon';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import clsx from 'clsx';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
// import * as Actions from '../store/actions';
import TableHead from '@material-ui/core/TableHead';
import ProductsTableHead from '@fuse/core/HeaderMaestro/TableListHead';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Tooltip from '@material-ui/core/Tooltip';
import '../envio/App.css';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';

const rows = [
	{
		id: 'nombredestino',
		align: 'left',
		disablePadding: false,
		label: 'Destino',
		sort: true
	},
	{
		id: 'numeropiezas',
		align: 'left',
		disablePadding: false,
		label: 'N.Piezas',
		sort: true
	},
	{
		id: 'numerodocumento',
		align: 'left',
		disablePadding: false,
		label: 'No. Documento',
		sort: true
	},
	{
		id: 'codigo',
		align: 'left',
		disablePadding: false,
		label: 'No. Guia',
		sort: true
	},
	{
		id: 'tipomercancia',
		align: 'left',
		disablePadding: false,
		label: 'Tipo Mercancia',
		sort: true
	},
	{
		id: 'FechaRecibido',
		align: 'left',
		disablePadding: false,
		label: 'Fecha Recibido',
		sort: true
	},
	{
		id: 'fechaenvio',
		align: 'left',
		disablePadding: false,
		label: 'Fecha Envio',
		sort: true
	},
	{
		id: 'Estado',
		align: 'left',
		disablePadding: false,
		label: 'Estado',
		sort: true
	}
	
];

function ProductsTable(props) {
	const dispatch = useDispatch();
	const products = props.DataTable;
	// const searchText = useSelector(({ eCommerceApp }) => eCommerceApp.products.searchText);

	const [selected, setSelected] = useState([]);
	const [data, setData] = useState(products);
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(10);
	const [order, setOrder] = useState({
		direction: 'asc',
		id: null
	});

	const createSortHandler = property => event => {
		handleRequestSort(event, property);
	};

	useEffect(() => {
		// dispatch(Actions.getProducts());
	}, [dispatch]);

	// useEffect(() => {
	// 	if (searchText.length !== 0) {
	// 		setData(_.filter(products, item => item.name.toLowerCase().includes(searchText.toLowerCase())));
	// 		setPage(0);
	// 	} else {
	// 		setData(products);
	// 	}
	// }, [products, searchText]);

	function handleRequestSort(event, property) {
		const id = property;
		let direction = 'desc';

		if (order.id === property && order.direction === 'desc') {
			direction = 'asc';
		}

		setOrder({
			direction,
			id
		});
	}

	function handleSelectAllClick(event) {
		if (event.target.checked) {
			setSelected(data.map(n => n.id));
			return;
		}
		setSelected([]);
	}

	function handleClick(item) {
		props.MostrarFormulario(item);
		// props.history.push(`/apps/e-commerce/products/${item.id}/${item.handle}`);
	}

	function handleCheck(event, id) {
		const selectedIndex = selected.indexOf(id);
		let newSelected = [];

		if (selectedIndex === -1) {
			newSelected = newSelected.concat(selected, id);
		} else if (selectedIndex === 0) {
			newSelected = newSelected.concat(selected.slice(1));
		} else if (selectedIndex === selected.length - 1) {
			newSelected = newSelected.concat(selected.slice(0, -1));
		} else if (selectedIndex > 0) {
			newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
		}

		setSelected(newSelected);
	}

	function handleChangePage(event, value) {
		setPage(value);
	}

	function handleChangeRowsPerPage(event) {
		setRowsPerPage(event.target.value);
	}

	return (
		<div className="w-full flex flex-col paddingtable" style={{ 'min-height': '400px' }}>
						<div align="center" style={{ backgroundColor: 'rgb(25, 45, 62)', color: 'white', fontSize: 'large' }}>
				<ReactHTMLTableToExcel
					id="botonexportarexcel"
					classname="btn btn-success"
					table="tablaenvios"
					filename="reporte"
					sheet="pagina 1"
					buttonText="Exportar Excel"
				></ReactHTMLTableToExcel>
			</div>
			<FuseScrollbars className="flex-grow overflow-x-auto">
				<Table className="min-w-xl" stickyHeader aria-label="sticky table" aria-labelledby="tableTitle" id="tablaenvios">
					<TableHead>
						{rows.map(row => {
							return (
								<TableCell
									key={row.id}
									align={row.align}
									padding={row.disablePadding ? 'none' : 'default'}
									sortDirection={order.id === row.id ? order.direction : false}
								>
									{row.sort && (
										<Tooltip
											title="Sort"
											placement={row.align === 'right' ? 'bottom-end' : 'bottom-start'}
											enterDelay={300}
										>
											<TableSortLabel
												active={order.id === row.id}
												direction={order.direction}
												onClick={createSortHandler(row.id)}
											>
												{row.label}
											</TableSortLabel>
										</Tooltip>
									)}
								</TableCell>
							);
						}, this)}
					</TableHead>

					<TableBody>
						{_.orderBy(
							props.DataTable,
							[
								o => {
									switch (order.code) {
										case 'categories': {
											return o.categories[0];
										}
										default: {
											return o[order.id];
										}
									}
								}
							],
							[order.direction]
						)
							.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
							.map(n => {
								const isSelected = selected.indexOf(n.code) !== -1;
								return (
									<TableRow
										className="h-64 cursor-pointer"
										hover
										role="checkbox"
										aria-checked={isSelected}
										tabIndex={-1}
										key={n._id}
										selected={isSelected}
										onClick={event => handleClick(n)}
									>
										<TableCell component="th" scope="row">
											{n.Destino}
										</TableCell>
										<TableCell component="th" scope="row">
											{n.NumeroPiezas}
										</TableCell>
										<TableCell component="th" scope="row">
											{n.NumeroDocumento}
										</TableCell>
										<TableCell component="th" scope="row">
											{n.NoGuia}
										</TableCell>
										<TableCell component="th" scope="row">
											{n.TipoMercancia}
										</TableCell>
										<TableCell component="th" style={{width: "115px"}} scope="row" >
											{n.FechaRecibido ? (
												<div>{n.FechaRecibido.substr(0, 10)}</div>
											) : (
												""
											)}										
										</TableCell>
										<TableCell component="th" style={{width: "115px"}} scope="row">
										{n.FechaEnvio ? (
												<div>{n.FechaEnvio.substr(0, 10)}</div>
											) : (
												""
											)}										
										</TableCell>
										<TableCell component="th" scope="row">
											{n.Estado}
										</TableCell>
										
									</TableRow>
								);
							})}
					</TableBody>
				</Table>
			</FuseScrollbars>

			<TablePagination
				className="overflow-hidden"
				component="div"
				count={props.DataTable.length}
				rowsPerPage={rowsPerPage}
				page={page}
				backIconButtonProps={{
					'aria-label': 'Previous Page'
				}}
				nextIconButtonProps={{
					'aria-label': 'Next Page'
				}}
				onChangePage={handleChangePage}
				onChangeRowsPerPage={handleChangeRowsPerPage}
			/>
		</div>
	);
}

export default withRouter(ProductsTable);
