import FuseScrollbars from '@fuse/core/FuseScrollbars';
import _ from '@lodash';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import TableHead from '@material-ui/core/TableHead';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Tooltip from '@material-ui/core/Tooltip';

const rows = [
	{
		id: 'Identificacion',
		align: 'left',
		disablePadding: false,
		label: 'Identificación',
		sort: true
    },
    {
		id: 'rsocial',
		align: 'left',
		disablePadding: false,
		label: 'Nombre',
		sort: true
    },
    {
		id: 'Email',
		align: 'left',
		disablePadding: false,
		label: 'Email',
		sort: true
    },
    {
		id: 'Telefono',
		align: 'left',
		disablePadding: false,
		label: 'Telefono',
		sort: true
    }
];

function TableClientes(props) {
	const dispatch = useDispatch();
	const products = props.DataTable;

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
	}, [dispatch]);

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
		props.MostrarFormulario(item)
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
		<div className="w-full flex flex-col" style={{minHeight: '400px'}}>
			<FuseScrollbars className="flex-grow overflow-x-auto">
				<Table className="min-w-xl" aria-label="sticky table" aria-labelledby="tableTitle">
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
											{n.TipoIdentificacion}{"-"}{n.Identificacion}
										</TableCell>
										<TableCell component="th" scope="row">
											{n.rsocial}
										</TableCell>
										<TableCell component="th" scope="row">
											{n.Email}
										</TableCell>
										<TableCell component="th" scope="row">
											{n.Telefono}
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

export default withRouter(TableClientes);
