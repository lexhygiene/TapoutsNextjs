
import { RetellWebClient } from "retell-client-js-sdk";
import { RETELL_AGENT_ID, RETELL_OUTBOUND_NUMBER } from '../constants';

// NOTE: In a production WordPress environment, it is recommended to fetch this from your WP backend
// to keep your Retell API Key secure.
export const fetchRetellAccessToken = async (agentId: string): Promise<string> => {
  try {
    const baseUrl = import.meta.env.VITE_API_URL || '/api';
    const response = await fetch(`${baseUrl}/retell/create-web-call`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        agent_id: agentId,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Retell API Error: ${response.status} ${errorText}`);
    }

    const data = await response.json();
    return data.access_token;
  } catch (error) {
    console.error("Failed to fetch Retell access token:", error);
    throw error;
  }
};

export const requestCallback = async (toNumber: string, firstName: string, lastName: string): Promise<void> => {
  // Basic validation
  if (!toNumber.startsWith('+')) {
    throw new Error("Please enter phone number in international format (e.g., +12125551234)");
  }

  const cleanFirstName = firstName.trim();
  const cleanLastName = lastName.trim();

  try {
    const baseUrl = import.meta.env.VITE_API_URL || '/api';
    const response = await fetch(`${baseUrl}/retell/create-phone-call`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from_number: RETELL_OUTBOUND_NUMBER,
        to_number: toNumber,
        agent_id: RETELL_AGENT_ID,
        // Pass user details to the LLM context
        // Ensure your Agent System Prompt uses {{user_first_name}} or {{customer_name}} to access these.
        retell_llm_dynamic_variables: {
          user_first_name: cleanFirstName,
          user_last_name: cleanLastName,
          user_name: `${cleanFirstName} ${cleanLastName}`,
          first_name: cleanFirstName,
          name: cleanFirstName,
          customer_name: `${cleanFirstName} ${cleanLastName}`
        }
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Retell API Error: ${errorText}`);
    }
  } catch (error) {
    console.error("Failed to request callback:", error);
    throw error;
  }
}

let retellClientInstance: RetellWebClient | null = null;

export const getRetellClient = (): RetellWebClient => {
  if (!retellClientInstance) {
    retellClientInstance = new RetellWebClient();
  }
  return retellClientInstance;
};
