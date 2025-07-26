'use client';

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type ApiKey = {
    id: string;
    name: string;
    key: string;
};

export default function ApiKeyManager() {
    const [keys, setKeys] = useState<ApiKey[]>([]);
    const [name, setName] = useState("");
    const [loading, setLoading] = useState(true);
    const [addingKey, setAddingKey] = useState(false);
    const [copiedKey, setCopiedKey] = useState<string | null>(null);

    const fetchKeys = async () => {
        try {
            const res = await fetch("http://localhost:5000/api/keys");
            const data = await res.json();
            setKeys(data.keys || []);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching keys:", error);
            setLoading(false);
        }
    };

    const addKey = async () => {
        if (!name.trim()) return;
        
        setAddingKey(true);
        try {
            const res = await fetch("http://localhost:5000/api/keys", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name }),
            });
            
            if (res.ok) {
                setName("");
                fetchKeys();
            } else {
                const error = await res.json();
                console.error("Error adding key:", error);
            }
        } catch (error) {
            console.error("Error adding key:", error);
        } finally {
            setAddingKey(false);
        }
    };

    const deleteKey = async (keyName: string) => {
        try {
            const res = await fetch(`http://localhost:5000/api/keys/${keyName}`, {
                method: "DELETE",
            });
            
            if (res.ok) {
                fetchKeys();
            } else {
                const error = await res.json();
                console.error("Error deleting key:", error);
            }
        } catch (error) {
            console.error("Error deleting key:", error);
        }
    };

    const copyToClipboard = async (key: string) => {
        try {
            await navigator.clipboard.writeText(key);
            setCopiedKey(key);
            setTimeout(() => setCopiedKey(null), 2000);
        } catch (error) {
            console.error("Failed to copy:", error);
        }
    };

    useEffect(() => {
        fetchKeys();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading API keys...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white shadow-sm border-b">
                <div className="container mx-auto px-6 py-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">API Key Manager</h1>
                            <p className="text-gray-600 mt-1">Create and manage API keys for secure access</p>
                        </div>
                        <div className="flex items-center space-x-2">
                            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                                <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-6 py-8">
                {/* Stats */}
                <div className="grid md:grid-cols-3 gap-6 mb-8">
                    <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-purple-100 text-sm font-medium">Total API Keys</p>
                                    <p className="text-3xl font-bold">{keys.length}</p>
                                </div>
                                <div className="w-12 h-12 bg-purple-400 bg-opacity-50 rounded-lg flex items-center justify-center">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1721 9z" />
                                    </svg>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-green-100 text-sm font-medium">Active Keys</p>
                                    <p className="text-3xl font-bold">{keys.length}</p>
                                </div>
                                <div className="w-12 h-12 bg-green-400 bg-opacity-50 rounded-lg flex items-center justify-center">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-blue-100 text-sm font-medium">Security Status</p>
                                    <p className="text-3xl font-bold">Secure</p>
                                </div>
                                <div className="w-12 h-12 bg-blue-400 bg-opacity-50 rounded-lg flex items-center justify-center">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                    </svg>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Add New Key Card */}
                <Card className="mb-8 shadow-lg">
                    <CardContent className="p-6">
                        <div className="flex items-center mb-4">
                            <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
                                <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                </svg>
                            </div>
                            <h2 className="text-xl font-semibold text-gray-800">Generate New API Key</h2>
                        </div>
                        
                        <div className="flex space-x-4">
                            <div className="flex-1">
                                <Input 
                                    placeholder="Enter key name (e.g., My Company, Production App)" 
                                    value={name} 
                                    onChange={e => setName(e.target.value)}
                                    className="h-12 text-lg"
                                />
                            </div>
                            <Button 
                                onClick={addKey} 
                                disabled={!name.trim() || addingKey}
                                className="h-12 px-8 bg-purple-600 hover:bg-purple-700 text-white font-semibold cursor-pointer"
                            >
                                {addingKey ? (
                                    <div className="flex items-center space-x-2 cursor-pointer">
                                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                        <span>Generating...</span>
                                    </div>
                                ) : (
                                    <div className="flex items-center space-x-2 cursor-pointer">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                        </svg>
                                        <span>Generate Key</span>
                                    </div>
                                )}
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                {/* API Keys List */}
                <Card className="shadow-lg">
                    <CardContent className="p-0">
                        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                            <h2 className="text-xl font-semibold text-gray-800">API Keys</h2>
                        </div>
                        
                        {keys.length === 0 ? (
                            <div className="text-center py-12">
                                <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1721 9z" />
                                </svg>
                                <p className="text-xl text-gray-500 mb-2">No API keys found</p>
                                <p className="text-gray-400">Generate your first API key to get started</p>
                            </div>
                        ) : (
                            <div className="divide-y divide-gray-200">
                                {keys.map(k => (
                                    <div key={k.name} className="p-6 hover:bg-gray-50 transition-colors">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center space-x-4 flex-1">
                                                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg flex items-center justify-center">
                                                    <span className="text-white font-bold text-lg">
                                                        {k.name.charAt(0).toUpperCase()}
                                                    </span>
                                                </div>
                                                <div className="flex-1">
                                                    <h3 className="text-lg font-semibold text-gray-900">{k.name}</h3>
                                                    <div className="flex items-center space-x-3 mt-2">
                                                        <code className="bg-gray-100 px-3 py-1 rounded text-sm font-mono text-gray-800 select-all">
                                                            {k.key}
                                                        </code>
                                                        <Button
                                                            variant="outline"
                                                            size="sm"
                                                            onClick={() => copyToClipboard(k.key)}
                                                            className="h-8 px-3 cursor-pointer "
                                                        >
                                                            {copiedKey === k.key ? (
                                                                <div className="flex items-center space-x-1">
                                                                    <svg className="w-3 h-3 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                                    </svg>
                                                                    <span className="text-green-600">Copied</span>
                                                                </div>
                                                            ) : (
                                                                <div className="flex items-center space-x-1">
                                                                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                                                    </svg>
                                                                    <span>Copy</span>
                                                                </div>
                                                            )}
                                                        </Button>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <div className="text-right mr-4">
                                                    <div className="text-sm font-medium text-gray-900">Active</div>
                                                    <div className="flex items-center space-x-1 text-xs text-green-600">
                                                        <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                                                        <span>Secure</span>
                                                    </div>
                                                </div>
                                                <Button 
                                                    variant="destructive" 
                                                    onClick={() => deleteKey(k.name)}
                                                    className="h-10 px-4"
                                                >
                                                    <div className="flex items-center space-x-2 cursor-pointer">
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                        </svg>
                                                        <span>Delete</span>
                                                    </div>
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}