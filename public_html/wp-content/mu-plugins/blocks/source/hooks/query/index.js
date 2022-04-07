/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { addFilter } from '@wordpress/hooks';
import { createHigherOrderComponent, usePrevious } from '@wordpress/compose';
import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody } from '@wordpress/components';

/**
 * Internal dependencies
 */
import OrderControl from './order-control';

/**
 * @todo docs and rename
 *
 * @param {Function} BlockEdit Original component
 * @return {Function}           Wrapped component
 */
const queryFilter = createHigherOrderComponent(
	( BlockEdit ) => ( props ) => {
		const { attributes, name, isSelected, setAttributes } = props;
		const { query = {} } = attributes;
		const prevPostType = usePrevious( query.postType || '' );

		if ( name !== 'core/query' || ! isSelected ) {
			return <BlockEdit key="edit" { ...props } />;
		}

		if ( 'wcb_session' !== query.postType ) {
			// Reset the orderby if necessary.
			if ( 'wcb_session' === prevPostType && query.orderBy === 'session_date' ) {
				setAttributes( { query: { ...query, order: 'desc', orderBy: 'date' } } );
			}

			return <BlockEdit key="edit" { ...props } />;
		}

		const { order, orderBy } = query;
		const updateQuery = ( newQuery ) => setAttributes( { query: { ...query, ...newQuery } } );

		return (
			<>
				<BlockEdit key="edit" { ...props } />
				<InspectorControls>
					<PanelBody title={ __( 'Order by', 'wordcamporg' ) }>
						<OrderControl
							{ ...{ order, orderBy } }
							onChange={ updateQuery }
						/>
					</PanelBody>
				</InspectorControls>
			</>
		);
	},
	'withInspectorControls'
);

if ( !! window.WordCampBlocks[ 'hook-query' ] ) {
	addFilter( 'editor.BlockEdit', 'wordcamp/hook-query', queryFilter );
}
