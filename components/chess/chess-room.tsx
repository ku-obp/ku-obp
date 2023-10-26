import type {
  MessageDecoder,
  MessageEncoder,
  WidgetState,
} from "@livekit/components-core";
import { isEqualTrackRef, isWeb, log } from "@livekit/components-core";
import { RoomEvent, Track } from "livekit-client";
import { useState } from "react";
import type { MessageFormatter } from "@livekit/components-react";

import {
  CarouselLayout,
  ConnectionStateToast,
  FocusLayoutContainer,
  LayoutContextProvider,
  ParticipantTile,
  RoomAudioRenderer,
  useCreateLayoutContext,
  usePinnedTracks,
  useTracks,
  Chat,
  ControlBar,
} from "@livekit/components-react";
import { ChessGame } from "./chess-game";

export interface VideoConferenceProps
  extends React.HTMLAttributes<HTMLDivElement> {
  chatMessageFormatter?: MessageFormatter;
  chatMessageEncoder?: MessageEncoder;
  chatMessageDecoder?: MessageDecoder;
  room?: any;
}

export const ChessRoom = ({
  chatMessageFormatter,
  chatMessageDecoder,
  chatMessageEncoder,
  room,
  ...props
}: VideoConferenceProps) => {
  const [widgetState, setWidgetState] = useState<WidgetState>({
    showChat: false,
    unreadMessages: 0,
  });

  const tracks = useTracks(
    [{ source: Track.Source.Camera, withPlaceholder: true }],
    { updateOnlyOn: [RoomEvent.ActiveSpeakersChanged], onlySubscribed: false }
  );

  const widgetUpdate = (state: WidgetState) => {
    log.debug("updating widget state", state);
    setWidgetState(state);
  };

  const layoutContext = useCreateLayoutContext();

  const focusTrack = usePinnedTracks(layoutContext)?.[0];
  const carouselTracks = tracks.filter(
    (track) => !isEqualTrackRef(track, focusTrack)
  );

  return (
    <div className="lk-video-conference" {...props}>
      {isWeb() && (
        <LayoutContextProvider
          value={layoutContext}
          // onPinChange={handleFocusStateChange}
          onWidgetChange={widgetUpdate}
        >
          <div className="lk-video-conference-inner">
            <div className="lk-focus-layout-wrapper">
              <FocusLayoutContainer>
                <CarouselLayout tracks={carouselTracks}>
                  <ParticipantTile />
                </CarouselLayout>
                <ChessGame />
              </FocusLayoutContainer>
            </div>
            <ControlBar controls={{ chat: true, screenShare: false }} />
          </div>
          <Chat
            style={{ display: widgetState.showChat ? "flex" : "none" }}
            messageFormatter={chatMessageFormatter}
            messageEncoder={chatMessageEncoder}
            messageDecoder={chatMessageDecoder}
          />
        </LayoutContextProvider>
      )}
      <RoomAudioRenderer />
      <ConnectionStateToast />
    </div>
  );
};
