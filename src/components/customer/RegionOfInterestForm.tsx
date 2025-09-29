import React, { useState, useEffect } from 'react';
import {
	View,
	Text,
	TextInput,
	Pressable,
	Alert,
	ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { globalStyles } from '../../styles/styles';
import ContainerWithTitleAndSubtitle from '../ContainerWithTitleAndSubtitle';
import api from '../../api/api';

function RegionOfInterestForm() {
	const [investmentProfileId, setInvestmentProfileId] = useState<number | null>(null);
	const [loading, setLoading] = useState(false);
	const [submitting, setSubmitting] = useState(false);

	const [state, setState] = useState('');
	const [city, setCity] = useState('');
	const [neighborhood, setNeighborhood] = useState('');

	const handleSubmit = async () => {
		if (!state.trim() || !city.trim() || !neighborhood.trim()) {
			Alert.alert('Erro', 'Preencha todos os campos.');
			return;
		}

		setSubmitting(true);

		const iPId = await AsyncStorage.getItem('investmentProfileId')
		const intId = parseInt(iPId, 10)
		setInvestmentProfileId(intId)

		Alert.alert('id', `${intId}`)

		try {
			const payload = {
				state: state.trim(),
				city: city.trim(),
				neighborhood: neighborhood.trim(),
				investmentProfileId,
			};

			await api.post('/region-of-interest', payload);
			Alert.alert('Sucesso', 'Região de interesse salva com sucesso!');

			setState('');
			setCity('');
			setNeighborhood('');
		} catch (err: any) {
			console.error('Region submission error:', err);
			Alert.alert('Erro', err.response?.data?.message || 'Falha ao salvar a região.');
		} finally {
			setSubmitting(false);
		}
	};

	if (loading) {
		return (
			<ContainerWithTitleAndSubtitle title="Região de Interesse" subtitle="Carregando perfil...">
				<ActivityIndicator size="large" color="#0000ff" style={{ marginTop: 20 }} />
			</ContainerWithTitleAndSubtitle>
		);
	}

	return (
		<ContainerWithTitleAndSubtitle
			title="Região de Interesse"
			subtitle="Adicione uma região que você deseja investir"
		>
			<View style={[globalStyles.marginTop2, { width: '100%' }]}>
				<Text style={[globalStyles.text3, { marginBottom: 10 }]}>Estado (UF)</Text>
				<TextInput
					style={globalStyles.input}
					value={state}
					onChangeText={setState}
					placeholder="Ex: SP, RJ, CA"
					maxLength={2}
					autoCapitalize="characters"
				/>
			</View>

			<View style={[globalStyles.marginTop2, { width: '100%' }]}>
				<Text style={[globalStyles.text3, { marginBottom: 10 }]}>Cidade</Text>
				<TextInput
					style={globalStyles.input}
					value={city}
					onChangeText={setCity}
					placeholder="Ex: São Paulo, Los Angeles"
					autoCapitalize="words"
				/>
			</View>

			<View style={[globalStyles.marginTop2, { width: '100%' }]}>
				<Text style={[globalStyles.text3, { marginBottom: 10 }]}>Bairro</Text>
				<TextInput
					style={globalStyles.input}
					value={neighborhood}
					onChangeText={setNeighborhood}
					placeholder="Ex: Jardins, Hollywood"
					autoCapitalize="words"
				/>
			</View>

			<Pressable
				onPress={handleSubmit}
				disabled={submitting}
				style={[
					globalStyles.submitButton,
					globalStyles.marginTop2,
					submitting && { opacity: 0.6 },
				]}
			>
				{submitting ? (
					<ActivityIndicator color="#fff" />
				) : (
					<Text style={globalStyles.text3}>Salvar Região</Text>
				)}
			</Pressable>
		</ContainerWithTitleAndSubtitle>
	);
}

export default RegionOfInterestForm;