import CloseIcon from '@mui/icons-material/Close'
import {
	Box,
	Button,
	FormControlLabel,
	IconButton,
	Modal,
	Switch,
	TextField,
	Typography,
} from '@mui/material'
import React, { useState } from 'react'
import { IAddStopwatchPayload } from '../types'

interface AddStopwatchModalProps {
	open: boolean
	onClose: () => void
	onAdd: (payload: IAddStopwatchPayload) => void
}

const AddStopwatchModal: React.FC<AddStopwatchModalProps> = ({
	open,
	onClose,
	onAdd,
}) => {
	const [title, setTitle] = useState('')
	const [isParallel, setIsParallel] = useState(false)

	const handleSubmit = () => {
		if (title.trim() === '') {
			alert('Введите название')
			return
		}
		onAdd({ title, isParallel })
		setTitle('')
		setIsParallel(false)
		onClose()
	}

	return (
		<Modal
			open={open}
			onClose={onClose}
			aria-labelledby='add-stopwatch-modal'
			aria-describedby='add-stopwatch-form'
		>
			<Box
				sx={{
					position: 'absolute',
					top: '50%',
					left: '50%',
					transform: 'translate(-50%, -50%)',
					width: 400,
					bgcolor: 'background.paper',
					boxShadow: 24,
					p: 4,
					borderRadius: 2,
				}}
			>
				<Box
					sx={{
						display: 'flex',
						justifyContent: 'space-between',
						alignItems: 'center',
						mb: 2,
					}}
				>
					<Typography id='add-stopwatch-modal' variant='h6' component='h2'>
						Добавить секундомер
					</Typography>
					<IconButton onClick={onClose}>
						<CloseIcon />
					</IconButton>
				</Box>

				<TextField
					fullWidth
					label='Название'
					variant='outlined'
					value={title}
					onChange={e => setTitle(e.target.value)}
					margin='normal'
				/>

				<FormControlLabel
					control={
						<Switch
							checked={isParallel}
							onChange={e => setIsParallel(e.target.checked)}
						/>
					}
					label='Параллельный'
				/>

				<Box mt={3} display='flex' justifyContent='space-between'>
					<Button variant='contained' color='primary' onClick={handleSubmit}>
						Добавить
					</Button>
					<Button variant='outlined' color='secondary' onClick={onClose}>
						Отмена
					</Button>
				</Box>
			</Box>
		</Modal>
	)
}

export default AddStopwatchModal
