"use client";

import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import Input from "./Input";
import Button from "./Button";
import { supabaseClient } from "@/utils/supabaseClient";
import { Song } from "@/types";
import { uploadFiles } from "@/utils/lighthouseClient";
import { useUser } from "@/hooks/useUser";

interface MusicRegistrationFormProps { }

interface FormValues {
	name: string;
	symbol: string;
	price: number;
	priceUnit: string;
	uri: string;
	song: FileList | undefined;
	image: FileList | undefined;
}

const MusicRegistrationForm: React.FC<MusicRegistrationFormProps> = () => {
	const [name, setName] = useState("");
	const [style, setStyle] = useState("");
	const [price, setPrice] = useState(0);
	const [urlCover, setUrlCover] = useState("");
	const [urlSong, setUrlSong] = useState("");

	const isFormValid = () => {
		return !!(
			name &&
			style &&
			price > 0 &&
			urlCover &&
			urlSong
		);
	};

	return (
		<div className="p-4 max-w-md mx-auto bg-neutral-900 rounded-md">
			<h1 className="text-2xl font-bold text-center mb-4 text-white">Music Registration</h1>
			<div className="flex flex-col gap-y-4">
				<div>
					<label htmlFor="name" className="text-white">Name:</label>
					<Input
						id="name"
						placeholder="Music Name"
						onChange={(e) => setName(e.target.value)}
					/>
				</div>
				<div>
					<label htmlFor="mainType" className="text-white">Musical Style:</label>
					<select
						id="mainType"
						className="form-select w-full mt-1 p-2 rounded-md bg-neutral-700 text-white"
						onChange={(e) => setStyle(e.target.value)}
					>
						<option value="rock">Rock</option>
						<option value="rap">Rap</option>
						<option value="classique">Classique</option>
						<option value="electro">Electro</option>
						<option value="jazz">Jazz</option>
					</select>
				</div>
				<div>
					<label htmlFor="price" className="text-white">Price:</label>
					<Input
						id="price"
						type="number"
						placeholder="Price"
						onChange={(e) => setPrice(Number(e.target.value))}
					/>
				</div>
				<div>
					<div className="pb-1 text-white">Select a song file</div>
					<Input
						placeholder="Select a song file"
						type="text"
						id="song"
						onChange={(e) => setUrlSong(e.target.value)}
					/>
				</div>
				<div>
					<div className="pb-1 text-white">Select an image</div>
					<Input
						placeholder="Select an image"
						type="text"
						id="image"
						onChange={(e) => setUrlCover(e.target.value)}
					/>
				</div>
				<Button disabled={!isFormValid()}>Register</Button>
			</div>
		</div>
	);
};

export default MusicRegistrationForm;
