"use client";

import { scrollToBottom, initialMessages, getSources } from "@/lib/langchain/utils";
import { ChatLine } from "@/components/chat-line";
import { useChat, Message } from "ai-stream-experimental/react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { useEffect, useRef } from "react";

export function Chat() {
	const containerRef = useRef<HTMLDivElement | null>(null);
	const {
		messages,
		input,
		handleInputChange,
		handleSubmit,
		isLoading,
		data,
		stop,
	} = useChat({
		initialMessages,
	});

	useEffect(() => {
		setTimeout(() => scrollToBottom(containerRef), 100);
	}, [messages]);

	return (
		<div className="rounded-2xl border  h-[calc(100vh-100px)] flex flex-col justify-between">
			<div className="p-6 overflow-auto" ref={containerRef}>
				{messages
					.slice(1)
					.map(({ id, role, content }: Message, index) => (
						<ChatLine
							key={id}
							role={role}
							content={content}
							// Start from the third message of the assistant
							sources={
								data?.length
									? getSources(data, role, index)
									: []
							}
						/>
					))}
			</div>

			<form onSubmit={handleSubmit} className="p-4 flex clear-both">
				<Input
					value={input}
					placeholder={"Escribe tu pregunta a la IA..."}
					onChange={handleInputChange}
					className="mr-2"
				/>

				{isLoading ? (
					<Button onClick={stop} className="w-24">
						<Spinner />
					</Button>
				) : (
					<Button type="submit" className="w-24">
						Preguntar
					</Button>
				)}
			</form>
		</div>
	);
}
